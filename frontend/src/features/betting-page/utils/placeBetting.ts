import { bettingRoomQueryKey } from "@/shared/lib/bettingRoomInfo";
import { BettingRoomInfo, BettingRoomInfoSchema } from "@/shared/types";
import { BettingPool } from "@/shared/utils/bettingOdds";
import { responseUserInfoSchema } from "@betting-duck/shared";
import { QueryClient } from "@tanstack/react-query";

type PartialBettingPool = Partial<{
  option1: Partial<BettingPool["option1"]>;
  option2: Partial<BettingPool["option2"]>;
  isPlaceBet: boolean;
  placeBetAmount: number;
  isBettingEnd: boolean;
  selectedOption: keyof BettingPool;
}>;

interface PlaceBettingParams {
  selectedOption: "option1" | "option2";
  roomId: string;
  bettingAmount: number;
  bettingRoomInfo: BettingRoomInfo;
  queryClient: QueryClient;
  updateBettingPool: (partialPool: PartialBettingPool) => Promise<void>;
}

async function getUserInfo() {
  const response = await fetch("/api/users/userInfo");
  if (!response.ok) {
    throw new Error("사용자 정보를 불러오는데 실패했습니다.");
  }

  const { data } = await response.json();
  const result = responseUserInfoSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error);
    throw new Error("사용자 정보를 불러오는데 실패했습니다.");
  }

  return data;
}

async function placeBetting({
  selectedOption,
  roomId,
  bettingAmount,
  bettingRoomInfo,
  queryClient,
  updateBettingPool,
}: PlaceBettingParams) {
  const { duck } = await getUserInfo();
  const { isPlaceBet } = bettingRoomInfo;

  if (isPlaceBet) {
    console.error("이미 배팅을 했습니다.");
    return;
  }

  if (duck - bettingAmount < 0) {
    throw new Error("소유한 덕코인보다 더 많은 금액을 베팅할 수 없습니다.");
  }

  const response = await fetch("/api/bets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        betAmount: bettingAmount,
        selectOption: selectedOption,
      },
      channel: {
        roomId,
      },
    }),
  });
  if (!response.ok) {
    throw new Error("베팅에 실패했습니다.");
  }
  queryClient.setQueryData(bettingRoomQueryKey(roomId), (prevData: unknown) => {
    const parsedData = BettingRoomInfoSchema.safeParse(prevData);
    if (!parsedData.success) {
      return prevData;
    }
    return {
      ...parsedData.data,
      isPlaceBet: true,
      placeBetAmount: bettingAmount,
    };
  });
  await updateBettingPool({
    isPlaceBet: true,
    placeBetAmount: bettingAmount,
    selectedOption,
  });
}

export { placeBetting };
