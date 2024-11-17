import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BetRoomController } from "./bet-room.controller";
import { BetRoomService } from "./bet-room.service";
import { BetRoomRepository } from "./bet-room.repository";
import { UserRepository } from "src/auth/user.repository";
import { BetRoom } from "./bet-room.entity";
import { User } from "src/auth/user.entity";
import { RedisManagerModule } from "src/utils/redis-manager.module";
import { BetResultRepository } from "src/bet-result/bet-result.repository";
import { BetResult } from "src/bet-result/bet-result.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([BetRoom, User, BetResult]),
    RedisManagerModule,
  ],
  controllers: [BetRoomController],
  providers: [
    BetRoomService,
    BetRoomRepository,
    UserRepository,
    BetResultRepository,
  ],
})
export class BetRoomModule {}
