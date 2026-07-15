export default function Sidebar() {
  return (
    <aside
      style={{
        width: "320px",
        background: "#1f2937",
        color: "white",
        padding: "20px",
        height: "100vh",
      }}
    >
      <h2>💬 RChat</h2>

      <input
        type="text"
        placeholder="Search..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      />

      <div style={{ marginTop: "30px" }}>
        <p>👤 Rudraaksh</p>
        <p>🤖 AI Assistant</p>
        <p>👥 General Group</p>
      </div>
    </aside>
  );
}

