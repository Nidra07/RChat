export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111827",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "#1f2937",
          padding: "30px",
          borderRadius: "16px",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🔐 Login to RChat</h1>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            borderRadius: "8px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "14px",
            borderRadius: "8px",
          }}
        />

        <button
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </div>
    </main>
  );
}

