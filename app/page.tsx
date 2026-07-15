export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          padding: "30px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 10px 30px rgba(0,0,0,.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          🤖 RChat
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          AI Assistant by Rudraaksh Singh
        </p>

        <div
          style={{
            background: "#1e293b",
            borderRadius: "12px",
            padding: "15px",
            minHeight: "300px",
            marginBottom: "20px",
          }}
        >
          <p>Hello 👋</p>
          <p>I'm RChat.</p>
          <p>Your AI assistant is almost ready.</p>
        </div>

        <input
          type="text"
          placeholder="Type your message..."
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />
      </div>
    </main>
  );
}
