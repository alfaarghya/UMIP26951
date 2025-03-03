import RoomForm from "../components/RoomForm";

const Home = () => {
  return (
    <main className="w-full max-w-md p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Tic-Tac-Toe Online</h1>
      <RoomForm />
    </main>
  );
}

export default Home;
