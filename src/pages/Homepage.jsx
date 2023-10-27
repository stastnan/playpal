import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useEffect, useState } from "react";
import TopGamesSection from "src/components/TopGamesSection";
import Hero from "src/components/ui/Hero";

function Homepage() {
  const [parsedHotGames, setParsedHotGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHotGames = async () => {
      try {
        setIsLoading(true);
        const hotGames = await axios.get(
          `https://boardgamegeek.com//xmlapi2/hot?boardgame`
        );
        const data = hotGames?.data;

        // Parsing data from XML to JS - customized code for reading attributes
        const options = {
          ignoreAttributes: false,
        };
        const parser = new XMLParser(options);
        let parsedData = parser.parse(data);
        console.log(data);
        const hotGamesArray = parsedData?.items?.item;
        console.log(hotGamesArray);
        setParsedHotGames(hotGamesArray);
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
    </>
  );
}

export default Homepage;
