import { Injectable } from "@nestjs/common";
import { RedisManager } from "src/utils/redis.manager";
import { User } from "src/auth/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DBManager {
  private userStreamKey: string;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private redisManager: RedisManager,
  ) {
    this.userStreamKey = "stream:users";
    this.getUserFromStream();
  }

  async setUser(user: Partial<User>) {
    const params = [];
    Object.entries(user).forEach(([key, value]) => {
      params.push(key, value);
    });

    this.redisManager._xadd(this.userStreamKey, "*", ...params);
  }

  async getUserFromStream() {
    console.log("---------------------");
    const event = await this.redisManager._xread(1, this.userStreamKey, 10000);

    event[1].forEach(async (entry) => {
      const [entryKey, fields] = entry;
      console.log("user: ", fields);

      delete fields.stream_key;
      delete fields.event_status;
      delete fields.event_retries;
      await this.userRepository.update(parseInt(fields.id), fields);

      this.redisManager._xack(this.userStreamKey, entryKey);
    });

    this.getUserFromStream();
  }
}
