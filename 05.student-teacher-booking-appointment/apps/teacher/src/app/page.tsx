import { Button } from "@stba/ui/button";

const Home = () => {
  return (
    <>
      <h1 className="bg-green-400 h-24 w-full flex justify-center items-center text-4xl"> Teacher panel</h1>
      <div className="w-full flex justify-center">
        <Button appName="teacher" className="bg-green-300" />
      </div>
    </>
  );
}

export default Home;