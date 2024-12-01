import { cn } from "@/shared/misc";
import { BettingHeader } from "./BettingHeader";
import { BettingStatsDisplay } from "@/shared/components/BettingStatsDisplay/BettingStatsDisplay";
import { PercentageDisplay } from "@/shared/components/PercentageDisplay/PercentageDisplay";
import { useBettingContext } from "../hook/useBettingContext";
import { BettingFooter } from "./BettingFooter";
import { useBettingConnection } from "../hook/useBettingRoomConnection";
import { useBettingRoomInfo } from "../hook/useBettingRoomInfo";
import { BettingInput } from "./BettingInput";
import { placeBetting } from "../utils/placeBetting";
import { responseUserInfoSchema } from "@betting-duck/shared";
import { getBettingSummary } from "@/shared/utils/bettingOdds";
import React from "react";

function BettingContainer() {
  const contextValue = useBettingContext();
  const { socket, bettingRoomInfo, bettingPool, updateBettingPool } =
    contextValue;
  const { channel } = bettingRoomInfo;
  const [bettingSummary, setBettingSummary] = React.useState(
    getBettingSummary(bettingPool),
  );

  const updateBettingSummary = React.useCallback(() => {
    setBettingSummary(getBettingSummary(bettingPool));
  }, [bettingPool]);

  React.useEffect(() => {
    updateBettingSummary();
  }, [updateBettingSummary]);

  useBettingConnection(socket, bettingRoomInfo);
  useBettingRoomInfo({
    socket,
    bettingRoomInfo,
    bettingPool,
    updateBettingPool,
  });

  return (
    <div
      className={cn(
        "betting-container",
        "bg-layout-main h-full min-w-[70cqw] p-6",
      )}
    >
      <button
        onClick={() => {
          placeBetting({
            selectedOption: "option1",
            bettingAmount: 1,
            roomId: channel.id,
            isPlaceBet: bettingPool.isPlaceBet || false,
          });
          updateBettingPool({
            isPlaceBet: true,
            placeBetAmount: 1,
          });
        }}
      >
        ㅇㅇ
      </button>
      <button
        onClick={async () => {
          const response = await fetch("/api/users/userInfo");
          if (!response.ok) {
            throw new Error("사용자 정보를 불러오는데 실패했습니다.");
          }

          const { data } = await response.json();
          console.log(data);
          const result = responseUserInfoSchema.safeParse(data);
          if (!result.success) {
            console.error(result.error);
            throw new Error("사용자 정보를 불러오는데 실패했습니다.");
          }

          return data;
        }}
      >
        읽기
      </button>
      <div className="flex h-full flex-col justify-around">
        <BettingHeader content={channel.title} contextValue={contextValue} />
        <div className="flex w-full justify-around">
          <div className="flex w-full max-w-[45cqw] justify-between">
            <BettingStatsDisplay
              stats={bettingSummary.option1}
              content={channel.options.option1.name}
              uses="winning"
              className="min-w-[35cqw]"
            >
              <PercentageDisplay
                index={0}
                percentage={parseInt(bettingSummary.option1Percentage)}
              />
            </BettingStatsDisplay>
          </div>
          <div className="flex w-full max-w-[45cqw] justify-between">
            <BettingStatsDisplay
              stats={bettingSummary.option2}
              content={channel.options.option2.name}
              uses="losing"
              className="min-w-[35cqw]"
            >
              <PercentageDisplay
                index={1}
                percentage={parseInt(bettingSummary.option2Percentage)}
              />
            </BettingStatsDisplay>
          </div>
        </div>
        <div className="flex justify-around">
          <BettingInput uses={"winning"} />
          <BettingInput uses={"losing"} />
        </div>
        <BettingFooter />
      </div>
    </div>
  );
}

export { BettingContainer };
