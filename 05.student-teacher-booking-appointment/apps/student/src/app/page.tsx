import { Button } from "@stba/ui/button";

const Home = () => {
  return (
    <>
      <h1 className="bg-blue-400 h-24 w-full flex justify-center items-center text-4xl"> Student panel</h1>
      <div className="w-full flex justify-center">
        <Button appName="student" className="bg-red-300" />
      </div>
    </>
  );
}

export default Home;