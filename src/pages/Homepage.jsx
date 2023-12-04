// import axios from "axios";
// import { XMLParser } from "fast-xml-parser";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import Footer from "src/components/Footer";
import TopGamesSection from "src/components/TopGamesSection";
import UserSection from "src/components/UserSection";
import Hero from "src/components/ui/Hero";
// isGameInfoPage, setIsGameInfoPage

function Homepage() {
  // const [parsedHotGames, setParsedHotGames] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [selectedGame, setSelectedGame] = useState();

  // const [wishlist, setWishlist] = useState(() => {
  //   const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
  //   return savedWishlist || [];
  // });
  // const [isItemOnWishlist, setIsItemOnWishlist] = useState(() => {
  //   if (selectedGame) {
  //     return ItemInWishlist(selectedGame);
  //   }
  //   return false;
  // });

  // const ItemInWishlist = (id) => {
  //   return wishlist.includes(id);
  // };

  // const [selectedGameInfo, setSelectedGameInfo] = useState();

  // if (wishlist) {
  //   console.log(wishlist);
  // }
  // useEffect(() => {
  //   const fetchHotGames = async () => {
  //     try {
  //       setIsLoading(true);
  //       const hotGames = await axios.get(
  //         `https://boardgamegeek.com/xmlapi2/hot?boardgame`
  //       );

  //       const data = hotGames.data;

  //       // Parsing data from XML to JS - customized code for reading attributes
  //       const options = {
  //         ignoreAttributes: false,
  //       };
  //       const parser = new XMLParser(options);
  //       let parsedData = parser.parse(data);

  //       const hotGamesArray = parsedData?.items?.item;
  //       console.log(hotGamesArray);

  //       setParsedHotGames(hotGamesArray);
  //     } catch (err) {
  //       toast.error("Failed to load hot games");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchHotGames();
  // }, []);

  return (
    <>
      <Hero />
      <TopGamesSection />
      <Footer />
    </>
  );
}

export default Homepage;
