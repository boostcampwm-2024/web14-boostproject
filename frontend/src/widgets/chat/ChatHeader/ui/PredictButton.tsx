import { BettingPage } from "@/pages/betting-page";
import { Dialog, DialogTrigger, DialogContent } from "@/shared/ui/Dialog";

function PredictButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-default bg-secondary shadow-far rounded-lg px-3 py-1 font-extrabold">
          예측 하기
        </button>
      </DialogTrigger>
      <DialogContent>
        <BettingPage />
      </DialogContent>
    </Dialog>
  );
}

export { PredictButton };