import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RedisManager } from "src/utils/redis.manager";
import {
  joinRoomRequestSchema,
  joinRoomRequestType,
  leaveRoomRequestSchema,
  leaveRoomRequestType,
} from "@shared/schemas/shared";
import {
  fetchBetRoomInfoRequestSchema,
  fetchBetRoomInfoRequestType,
  joinBetRoomRequestSchema,
  joinBetRoomRequestType,
} from "@shared/schemas/bet/socket/request";
import { JwtUtils } from "src/utils/jwt.utils";

interface Channel {
  creator: string;
  status: string;
  option1: Record<string, string>;
  option2: Record<string, string>;
}

@WebSocketGateway({
  namespace: "api/betting",
  cors: true,
})
export class BetGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly redisManager: RedisManager,
    private readonly jwtUtils: JwtUtils,
  ) {}

  handleConnection(client: Socket) {
    try {
      const accessToken = client.handshake.auth.token;
      if (!accessToken) {
        client.emit("error", {
          event: "handleConnection",
          message: "엑세스 토큰이 존재하지 않습니다.",
        });
        client.disconnect(true);
        return;
      }
      const payload = this.jwtUtils.verifyToken(accessToken);
      client.data.userId =
        typeof payload.id === "number" ? String(payload.id) : payload.id;
      console.log(
        `Client connected: ${client.id}, User ID: ${client.data.userId}`,
      );
    } catch (err) {
      client.emit("error", {
        event: "handleConnection",
        message: "Connection error: " + err.message,
      });
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const userId = client.data.userId;
    this.redisManager.removeUserFromAllRooms(userId);
  }

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(client: Socket, payload: joinRoomRequestType) {
    const userId = client.data.userId;
    const { channel } = joinRoomRequestSchema.parse(payload);
    const nickname = await this.redisManager.client.hget(
      `user:${userId}`,
      "nickname",
    );
    const { roomId } = channel;
    client.join(roomId);

    const creatorID = await this.redisManager.client.get(
      `room:${roomId}:creator`,
    );
    const owner = userId === creatorID ? 1 : 0;

    await this.redisManager.setBettingUserOnJoin({
      userId,
      nickname,
      joinAt: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString(),
      roomId,
      owner: owner,
    });

    const users = await this.redisManager.getRoomUsersNicknameAndJoinAt(roomId);
    this.server.to(roomId).emit("fetchRoomUsers", users);
  }

  @SubscribeMessage("leaveRoom")
  async handleLeaveRoom(client: Socket, payload: leaveRoomRequestType) {
    const userId = client.data.userId;
    const { roomId } = leaveRoomRequestSchema.parse(payload);
    client.leave(roomId);

    await this.redisManager.client.del(`room:${roomId}:user:${userId}`);

    const users = await this.redisManager.getRoomUsersNicknameAndJoinAt(roomId);
    this.server.to(roomId).emit("fetchRoomUsers", users);
  }

  @SubscribeMessage("fetchBetRoomInfo")
  async handleFetchBetRoomInfo(
    client: Socket,
    payload: fetchBetRoomInfoRequestType,
  ) {
    const { roomId } = fetchBetRoomInfoRequestSchema.parse(payload);
    const channel = await this.redisManager.getChannelData(roomId);
    if (channel) {
      client.emit("fetchBetRoomInfo", { channel });
    } else {
      client.emit("error", {
        event: "fetchBetRoomInfo",
        message: "해당하는 채널이 존재하지 않습니다.",
      });
    }
  }

  @SubscribeMessage("joinBet")
  async handleJoinBet(client: Socket, payload: joinBetRoomRequestType) {
    const { sender, channel } = joinBetRoomRequestSchema.parse(payload);
    const targetChannel = await this.redisManager.getChannelData(
      channel.roomId,
    );
    const userId = client.data.userId;

    if (!this.validateUserId(client, userId)) {
      return;
    }
    if (!this.validateUserDuck(client, userId, sender.betAmount)) {
      return;
    }

    if (targetChannel && targetChannel.status === "active") {
      const selectedOption =
        sender.selectOption === "option1"
          ? targetChannel.option1
          : targetChannel.option2;

      if (selectedOption) {
        await this.redisManager.updateBetting(
          channel.roomId,
          sender.selectOption,
          sender.betAmount,
        );

        const updatedChannel = await this.getUpdatedChannel(
          channel.roomId,
          targetChannel,
        );

        this.server.to(channel.roomId).emit("fetchBetRoomInfo", {
          channel: updatedChannel,
        });

        await this.redisManager.setBettingUserOnBet({
          userId,
          roomId: channel.roomId,
          betAmount: sender.betAmount,
          selectedOption: sender.selectOption,
        });
        //TODO: RDB에 배팅 내역 저장 로직 추가
      } else {
        client.emit("error", {
          event: "joinBet",
          message: "해당하는 옵션이 존재하지 않습니다.",
        });
      }
    } else {
      client.emit("error", {
        event: "joinBet",
        message: "해당하는 채널이 존재하지 않거나 활성 상태가 아닙니다.",
      });
    }
  }

  private async validateUserId(client: Socket, userId: string | undefined) {
    if (!userId) {
      client.emit("error", {
        event: "joinBet",
        message: "인증되지 않은 사용자입니다.",
      });
      return false;
    }
    return true;
  }

  private async validateUserDuck(
    client: Socket,
    userId: string,
    betAmount: number,
  ) {
    const userDuck = await this.redisManager.client.hget(
      `user:${userId}`,
      "duck",
    );
    if (!userDuck || Number(userDuck) < betAmount) {
      client.emit("error", {
        event: "joinBet",
        message: "보유한 duck이 부족합니다.",
      });
      return false;
    }
    return true;
  }

  private async getUpdatedChannel(roomId: string, targetChannel: Channel) {
    const [updatedOption1, updatedOption2] = await Promise.all([
      this.redisManager.client.hgetall(`room:${roomId}:option1`),
      this.redisManager.client.hgetall(`room:${roomId}:option2`),
    ]);

    const updatedChannel = {
      creator: targetChannel.creator,
      status: targetChannel.status,
      option1: updatedOption1,
      option2: updatedOption2,
    };
    return updatedChannel;
  }
}
