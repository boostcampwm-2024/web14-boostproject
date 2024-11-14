import { z } from 'zod';

export const roomIdSchema = z.object({
  roomId: z.string().min(1, 'Room ID가 필요합니다.'),
});

export const senderSchema = z.object({
  nickname: z.string().min(1, '닉네임이 필요합니다.'),
});

export const messageSchema = z.object({
  message: z.string().min(1, '메시지가 필요합니다.'),
});


export const joinRoomRequestSchema = z.object({
  sender: senderSchema,
  channel: roomIdSchema,
});

export type joinRoomRequestType = z.infer<typeof joinRoomRequestSchema>;

export const leaveRoomRequestSchema = roomIdSchema;

export type leaveRoomRequestType = z.infer<typeof leaveRoomRequestSchema>;
