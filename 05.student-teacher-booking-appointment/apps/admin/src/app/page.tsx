import { Button } from "@stba/ui/button";

const Home = () => {
  return (
    <>
      <h1 className="bg-red-400 h-24 w-full flex justify-center items-center text-4xl"> Admin panel</h1>
      <div className="w-full flex justify-center">
        <Button appName="admin" className="bg-blue-400" />
      </div>
    </>
  );
}

export default Home;