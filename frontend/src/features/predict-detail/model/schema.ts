import { z } from "zod";

export const bettinResultSchema = z.object({
  option_1_total_bet: z.coerce.number().int().min(0),
  option_2_total_bet: z.coerce.number().int().min(0),
  option_1_total_participants: z.coerce.number().int().min(0),
  option_2_total_participants: z.coerce.number().int().min(0),
  winning_option: z.union([z.literal("option1"), z.literal("option2")]),
  message: z.string(),
});

export type BetResultResponseType = z.infer<typeof bettinResultSchema>;
