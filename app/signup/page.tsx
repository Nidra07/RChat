export default function SignupPage() {
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
          width: "400px",
          background: "#1f2937",
          padding: "30px",
          borderRadius: "16px",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🚀 Create RChat Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          style={{ width: "100%", marginTop: "20px", padding: "14px", borderRadius: "8px" }}
        />

        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", marginTop: "15px", padding: "14px", borderRadius: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", marginTop: "15px", padding: "14px", borderRadius: "8px" }}
        />

        <button
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            borderRadius: "8px",
            border: "none",
            background: "#22c55e",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Create Account
        </button>
      </div>
    </main>
  );
}

