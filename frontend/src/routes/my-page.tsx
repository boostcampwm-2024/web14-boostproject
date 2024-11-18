import { createFileRoute } from "@tanstack/react-router";
import { BettingPredictResult } from "@/features/betting-predict-result";

export const Route = createFileRoute("/my-page")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BettingPredictResult outcome="win" />;
}
