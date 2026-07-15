export default function ChatWindow() {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#111827",
        color: "white",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #374151",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        🤖 AI Assistant
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "#1f2937",
            padding: "12px 16px",
            borderRadius: "12px",
            width: "fit-content",
          }}
        >
          👋 Hello Rudraaksh! Welcome to RChat.
        </div>
      </div>

      {/* Input */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #374151",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          style={{
            padding: "14px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          ➤
        </button>
      </div>
    </main>
  );
}
