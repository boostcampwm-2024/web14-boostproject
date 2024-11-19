import { ChatHeader } from "@/features/chat/ui/ChatHeader";
import { ChatInput } from "@/features/chat/ui/ChatInput";
import { ChatMessages } from "@/features/chat/ui/ChatMessages";
import { ChatProvider } from "./provider/ChatProvider";

function Chat() {
  return (
    <ChatProvider>
      <div className="flex flex-col justify-end">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </ChatProvider>
  );
}

export { Chat };
