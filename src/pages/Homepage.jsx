import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useEffect, useState } from "react";
import TopGamesSection from "src/components/TopGamesSection";
import UserSection from "src/components/UserSection";
import Hero from "src/components/ui/Hero";

function Homepage() {
  const [parsedHotGames, setParsedHotGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHotGames = async () => {
      try {
        console.log("start");
        setIsLoading(true);
        const hotGames = await axios.get(
          `https://boardgamegeek.com/xmlapi2/hot?boardgame`
        );
        console.log(`hot: ${hotGames}`);

        const data = hotGames.data;
        console.log(data);
        // Parsing data from XML to JS - customized code for reading attributes
        const options = {
          ignoreAttributes: false,
        };
        const parser = new XMLParser(options);
        let parsedData = parser.parse(data);

        const hotGamesArray = parsedData?.items?.item;
        console.log(hotGamesArray);

        setParsedHotGames(hotGamesArray);
        console.log(parsedHotGames);
      } catch (err) {
        throw Error("Failed to load hot games");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotGames();
  }, []);

  return (
    <>
      <Hero />
      <TopGamesSection parsedHotGames={parsedHotGames} isLoading={isLoading} />
      <UserSection />
    </>
  );
}

export default Homepage;
