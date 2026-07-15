import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#111827",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
        }}
      >
        Welcome to RChat 🚀
      </main>
    </div>
  );
}

