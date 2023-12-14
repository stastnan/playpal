import Footer from "src/components/Footer";
import TopGamesSection from "src/components/TopGamesSection";
import UserSection from "src/components/UserSection";
import Hero from "src/components/ui/Hero";

function Homepage() {
  return (
    <>
      <Hero />
      <TopGamesSection />
      <UserSection />
      <Footer />
    </>
  );
}

export default Homepage;
