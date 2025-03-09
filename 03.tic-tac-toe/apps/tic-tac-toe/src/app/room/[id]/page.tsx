import Board from "../../../components/Board";

export default async function RoomPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">Room: {id}</h2>
      <Board roomId={id} />
    </>
  );
}
