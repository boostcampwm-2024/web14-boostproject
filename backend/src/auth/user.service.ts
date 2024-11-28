import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { RedisManager } from "src/utils/redis.manager";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import {
  requestSignUpSchema,
  requestSignInSchema,
  requestGuestSignInSchema,
  requestUpgradeGuest,
} from "@shared/schemas/users/request";
import { SignUpUserRequestDto } from "./dto/sign-up-user.dto";
import { SignInUserRequestDto } from "./dto/sign-in-user.dto";
import { UpgradeGuestRequestDto } from "./dto/upgrade-guest.dto";
import { DBManager } from "src/utils/db.manager";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private redisManager: RedisManager,
    private dbManager: DBManager,
  ) {}

  async signUp(body: SignUpUserRequestDto): Promise<void> {
    const { email, nickname, password } = requestSignUpSchema.parse(body);

    const regex = /^익명의[^\w\s]?/;
    if (regex.test(nickname)) {
      throw new ConflictException("비회원 닉네임은 사용할 수 없습니다.");
    }

    const hashedPassword = await this.hashPassword(password);
    const user = {
      email,
      nickname,
      password: hashedPassword,
      duck: 300,
    };
    await this.userRepository.createUser(user);
  }

  async signIn(body: SignInUserRequestDto): Promise<{
    accessToken: string;
    email: string;
    nickname: string;
    role: string;
  }> {
    const { email, password } = requestSignInSchema.parse(body);
    const role = "user";
    const user = await this.userRepository.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const nickname = user.nickname;

      if (!(await this.redisManager.findUser(String(user.id)))) {
        await this.redisManager.setUser({
          userId: String(user.id),
          nickname: nickname,
          role: role,
          duck: user.duck,
        });
      }

      const payload = {
        id: user.id,
        role: role,
      };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken, email, nickname, role };
    } else {
      throw new UnauthorizedException("login failed");
    }
  }

  async guestSignIn(
    req: Request,
  ): Promise<{ accessToken: string; nickname: string; role: string }> {
    const { nickname } = requestGuestSignInSchema.parse(req.body);
    const regex = /^익명의[^\w\s]?/;
    if (!regex.test(nickname)) {
      throw new ConflictException("비회원 닉네임이 필요합니다.");
    }

    const role = "guest";
    const guestIdentifier = this.generateGuestIdentifier(req);

    if (await this.redisManager.findUser(guestIdentifier)) {
      const userInfo = await this.redisManager.getUser(guestIdentifier);
      if (userInfo.nickname !== nickname) {
        throw new ConflictException("로그인 내역이 존재합니다.");
      }
    } else {
      const userKey = await this.redisManager.nickNameExists(nickname);
      console.log(userKey);
      if (userKey && guestIdentifier !== userKey)
        throw new ConflictException("이미 등록된 닉네임입니다.");

      await this.redisManager.setUser({
        userId: guestIdentifier,
        nickname: nickname,
        role: role,
        duck: 300,
      });
    }

    const payload = {
      id: guestIdentifier,
      role: role,
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, nickname, role };
  }

  async signOut(req: Request, res: Response) {
    // TODO : 로그아웃 시에도 IP 검증 필요?
    const userInfo = req["user"];

    if (userInfo.role === "guest") {
      await this.redisManager.deleteUser(String(userInfo.id));
    }

    res.clearCookie("access_token");
  }

  async getUserInfo(req: Request) {
    const userId = req["user"].id;

    const cachedUserInfo = await this.redisManager.getUser(String(userId));
    if (cachedUserInfo?.nickname) {
      return cachedUserInfo;
    }

    const userInfo = await this.userRepository.findOneById(userId);
    if (userInfo) {
      await this.redisManager.setUser({
        userId: String(userInfo.id),
        nickname: userInfo.nickname,
        role: req["user"].role,
        duck: userInfo.duck,
      });
      return userInfo;
    }

    throw new NotFoundException("해당 유저를 찾을 수 없습니다.");
  }

  async getGuestLoginActivity(req: Request) {
    const guestIdentifier = this.generateGuestIdentifier(req);
    const userInfo = await this.redisManager.getUser(guestIdentifier);
    if (userInfo.role === "guest") {
      return {
        loggedInBefore: true,
        nickname: userInfo.nickname,
      };
    } else {
      return {
        loggedInBefore: false,
        nickname: null,
      };
    }
  }

  async checkNicknameExists(nickname: string) {
    const [existsInDB, existsInCache] = await Promise.all([
      this.userRepository.findOneByNickname(nickname),
      this.redisManager.nickNameExists(nickname),
    ]);

    if (existsInDB || existsInCache) {
      return { exists: true };
    }

    return { exists: false };
  }

  // 구현 중
  async upgradeGuest(
    req: Request,
    res: Response,
    body: UpgradeGuestRequestDto,
  ) {
    const userInfo = req["user"];
    const { duck } = await this.redisManager.getUser(userInfo.id);

    const { email, nickname, password } = requestUpgradeGuest.parse(body);
    const hashedPassword = await this.hashPassword(password);

    const user = {
      email,
      nickname,
      password: hashedPassword,
      duck: parseInt(duck),
    };

    await this.userRepository.createUser(user);

    // TODO : 로그인까지 한번에 해결하는 것이 좋을까?
  }

  async redisTest() {
    await this.redisManager._xadd("test", "*", "field1", "value1");
    // await this.redisManager.addStreamEntry();
    return { status: "OK" };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private generateGuestIdentifier(request: Request): string {
    const clientIp =
      request.headers["x-forwarded-for"] || request.connection.remoteAddress;
    return "guest-" + clientIp;
  }

  // 테스트용 메서드
  async updateDuck(req: Request, duck: number) {
    const userId = req["user"].id;
    const role = req["user"].role;
    const user = await this.redisManager.getUser(String(userId));
    if (role === "user") await this.userRepository.update(userId, { duck });

    const newUserInfo = {
      userId: String(userId),
      nickname: user.nickname,
      role: user.role,
      duck: duck,
    };
    await this.redisManager.setUser(newUserInfo);

    return newUserInfo;
  }

  // DBManager 테스트용 메서드
  async dbTest(userId: number) {
    await this.dbManager.setUser(userId, { duck: 300 });
    await this.dbManager.setBet(2, { betAmount: 300 });
  }
}
