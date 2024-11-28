import React from "react";
import { useBettingContext } from "../hook/useBettingContext";
import { TimerIcon } from "@/shared/icons";
import { ProgressBar } from "@/shared/components/ProgressBar";

function BettingTimer() {
  const [remainingTime, setRemainingTime] = React.useState(0);
  const [timerActive, setTimerActive] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const { bettingRoomInfo, socket } = useBettingContext();
  const { endAt, startAt } = bettingRoomInfo.channel.metadata;

  React.useEffect(() => {
    if (!endAt || !startAt) return;
    const endTime = new Date(endAt).getTime();
    const startTime = new Date(startAt).getTime();

    const timeOffset = 1800;
    const adjustedEndTime = endTime - timeOffset;
    const totalDuration = adjustedEndTime - startTime;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = adjustedEndTime - now;
      const elapsed = now - startTime;
      const currentProgress = (elapsed / totalDuration) * 100;

      if (remaining <= 0) {
        setTimerActive(false);
        setProgress(100);
        setRemainingTime(0);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      } else {
        setTimerActive(true);
        setRemainingTime(remaining);
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    // 초기 상태 설정
    updateTimer();

    // 타이머 시작
    if (Date.now() < adjustedEndTime) {
      timerRef.current = setInterval(updateTimer, 50);
    }

    // 서버의 timeover 이벤트 처리
    const handleTimeover = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setTimerActive(false);
      setProgress(100);
      setRemainingTime(0);
    };

    socket.on("timeover", handleTimeover);

    return () => {
      socket.off("timeover");
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [socket, endAt, startAt]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="bg-layout-main px-8 pt-4">
      <div className="flex items-center gap-4">
        <TimerIcon width={24} height={24} />
        <ProgressBar
          label="투표 진행 시간 타이머"
          uses="default"
          max={100}
          value={progress}
          className="w-full"
        />
      </div>
      <div>{timerActive ? formatTime(remainingTime) : "투표 종료"}</div>
    </div>
  );
}

export { BettingTimer };