import Sidebar from "@/components/sidebar/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#111827",
      }}
    >
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

