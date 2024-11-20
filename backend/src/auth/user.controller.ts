import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Post,
  Req,
  Res,
  Param,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { JwtUserAuthGuard } from "src/utils/guards/http-user-authenticated.guard";
import { JwtGuestAuthGuard } from "src/utils/guards/http-guest-authenticated.guard";
import { UserService } from "./user.service";
import { SignUpUserRequestDto } from "./dto/sign-up-user.dto";
import { SignInUserRequestDto } from "./dto/sign-in-user.dto";
import { CheckNicknameExistsDto } from "./dto/check-nickname-exists.dto";

@Controller("/api/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  async signUp(@Body() body: SignUpUserRequestDto, @Res() res: Response) {
    await this.userService.signUp(body);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: {
        message: "CREATED",
      },
    });
  }

  @Post("/signin")
  async signIn(@Body() body: SignInUserRequestDto, @Res() res: Response) {
    const result = await this.userService.signIn(body);
    res.cookie("access_token", result.accessToken, {
      httpOnly: true, // JavaScript에서 접근할 수 없도록 설정 (보안 목적)
      maxAge: 1000 * 60 * 60, // 쿠키의 유효 기간 (1시간)
      secure: false, // HTTPS를 통해서만 전송되도록 설정 (프로덕션에서 추천)
      // sameSite: "strict", // CSRF 공격 방지를 위한 설정
    });
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @Post("/guestsignin")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        nickname: { type: "string" },
      },
    },
  })
  async guestSignIn(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.guestSignIn(req);
    res.cookie("access_token", result.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: false,
      // sameSite: "strict",
    });
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @UseGuards(JwtGuestAuthGuard)
  @Get("/token")
  async getAccessToken(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.cookies["access_token"];
    if (!accessToken) {
      return res
        .status(404)
        .json({ message: "쿠키에 포함되어 있는 토큰이 존재하지 않습니다." });
    }
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        accessToken: accessToken,
      },
    });
  }

  @ApiOperation({ summary: "사용자 정보 조회" })
  @UseGuards(JwtUserAuthGuard)
  @Get("/:userId")
  async getUserInfo(
    @Param("userId") userId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.userService.getUserInfo(req["user"], userId);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @ApiOperation({ summary: "비회원 로그인 이력 조회" })
  @Post("/guestloginactivity")
  async guestLoginActivity(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.getGuestLoginActivity(req);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @ApiOperation({ summary: "닉네임 중복검사" })
  @Post("/nicknameexists")
  async guestExists(
    @Body() body: CheckNicknameExistsDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.checkNicknameExists(body);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }
}
