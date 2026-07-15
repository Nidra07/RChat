export default async function DirectChat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
      }}
    >
      💬 Private Chat
      <br />
      Conversation ID: {id}
    </main>
  );
}

