import React from "react";
import { z } from "zod";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { useSocketIO } from "@/shared/hooks/useSocketIo";
import { useNavigate } from "@tanstack/react-router";
import { getBetResults } from "@/features/predict-detail/model/api";

function useBettingConnection(
  socket: ReturnType<typeof useSocketIO>,
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>,
) {
  const navigate = useNavigate();
  const hasJoined = React.useRef(false);
  const hasFetched = React.useRef(false);

  // 초기 joinRoom 이벤트 전송 (한 번만 실행)
  React.useEffect(() => {
    if (!socket.isConnected || hasJoined.current) return;

    console.log("joinRoom");
    socket.emit("joinRoom", {
      channel: {
        roomId: bettingRoomInfo.channel.id,
      },
    });
    hasJoined.current = true;

    // cleanup: 컴포넌트 언마운트 시 room 떠나기
    return () => {
      if (socket.isConnected) {
        socket.emit("leaveRoom", {
          roomId: bettingRoomInfo.channel.id,
        });
      }
    };
  }, [socket, socket.isConnected, bettingRoomInfo.channel.id]);

  // 초기 fetchBetRoomInfo 이벤트 전송 (한 번만 실행)
  React.useEffect(() => {
    if (
      !socket.isConnected ||
      bettingRoomInfo.channel.status !== "active" ||
      hasFetched.current
    )
      return;

    console.log("fetchBetRoomInfo");
    socket.emit("fetchBetRoomInfo", {
      roomId: bettingRoomInfo.channel.id,
    });
    hasFetched.current = true;
  }, [
    socket,
    socket.isConnected,
    bettingRoomInfo.channel.id,
    bettingRoomInfo.channel.status,
  ]);

  const handleFinished = React.useCallback(
    async (data: unknown) => {
      console.log("배팅이 종료되었습니다", data);
      try {
        await getBetResults(bettingRoomInfo.channel.id);
      } catch (error) {
        console.error("종료된 베팅 게임이 존재하지 않습니다.", error);
        return navigate({
          to: "/my-page",
        });
      }
      navigate({
        to: `/betting/${bettingRoomInfo.channel.id}/vote/resultDetail`,
      });
    },
    [bettingRoomInfo.channel.id, navigate],
  );

  // 이벤트 리스너 등록 (한 번만 실행)
  React.useEffect(() => {
    const handleCancelWaitingRoom = (data: unknown) => {
      console.log("배팅이 취소되었습니다", data);
      navigate({
        to: "/my-page",
      });
    };

    if (socket.isConnected) {
      socket.on("finished", handleFinished);
      socket.on("cancelWaitingRoom", handleCancelWaitingRoom);
    }

    return () => {
      if (socket.isConnected) {
        socket.off("finished");
        socket.off("cancelWaitingRoom");
      }
    };
  }, [socket, socket.isConnected, handleFinished, navigate]);
}

export { useBettingConnection };
