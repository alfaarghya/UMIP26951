import Board from "../../../components/Board";

export default async function RoomPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <main className="w-full max-w-lg p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Room: {id}</h2>
      <Board roomId={id} />
    </main>
  );
}
