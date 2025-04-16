import Footer from "@stba/ui/Footer";
import Hero from "@stba/ui/Hero";

const Home = () => {
  return (
    <div className="h-screen bg-red-400 flex flex-col justify-evenly">
      <Hero />
      <Footer />
    </div>
  );
}

export default Home;