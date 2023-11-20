import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useEffect, useState } from "react";
import TopGamesSection from "src/components/TopGamesSection";
import UserSection from "src/components/UserSection";
import Hero from "src/components/ui/Hero";

function Homepage({ isGameInfoPage, setIsGameInfoPage }) {
  const [parsedHotGames, setParsedHotGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState();

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    return savedWishlist || [];
  });
  const [isItemOnWishlist, setIsItemOnWishlist] = useState(() => {
    if (selectedGame) {
      return ItemInWishlist(selectedGame);
    }
    return false;
  });

  const ItemInWishlist = (id) => {
    return wishlist.includes(id);
  };

  const [selectedGameInfo, setSelectedGameInfo] = useState();

  if (wishlist) {
    console.log(wishlist);
  }
  useEffect(() => {
    const fetchHotGames = async () => {
      try {
        setIsLoading(true);
        const hotGames = await axios.get(
          `https://boardgamegeek.com/xmlapi2/hot?boardgame`
        );

        const data = hotGames.data;

        // Parsing data from XML to JS - customized code for reading attributes
        const options = {
          ignoreAttributes: false,
        };
        const parser = new XMLParser(options);
        let parsedData = parser.parse(data);

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
      <TopGamesSection
        parsedHotGames={parsedHotGames}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        wishlist={wishlist}
        setWishlist={setWishlist}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        isItemOnWishlist={isItemOnWishlist}
        setIsItemOnWishlist={setIsItemOnWishlist}
        setSelectedGameInfo={setSelectedGameInfo}
        ItemInWishlist={ItemInWishlist}
        isGameInfoPage={isGameInfoPage}
        setIsGameInfoPage={setIsGameInfoPage}
      />
      <UserSection
        wishlist={wishlist}
        setWishlist={setWishlist}
        isGameInfoPage={isGameInfoPage}
        setIsGameInfoPage={setIsGameInfoPage}
      />
    </>
  );
}

export default Homepage;
