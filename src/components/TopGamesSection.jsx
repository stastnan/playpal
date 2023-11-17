import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import GameSwiperImage from "./GameSwiperImage";
import GameInfoCard from "./GameInfoCard";
import { customTheme } from "src/main";
import SearchButton from "./SearchButton";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import he from "he";

function TopGamesSection({
  parsedHotGames,
  isLoading,
  setIsLoading,
  wishlist,
  setWishlist,
  selectedGame,
  setSelectedGame,
  isItemOnWishlist,
  setIsItemOnWishlist,
  setSelectedGameInfo,
  ItemInWishlist,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCardClick = (id) => {
    const selectedGame = parsedHotGames.find((game) => game["@_id"] === id);
    setIsOpen(true);
    setSelectedGame(selectedGame);
  };

  const slidesPerView = useBreakpointValue(
    {
      base: 3,
      sm: 4,
      md: 6,
      lg: 7,
      xl: 9,
      "2xl": 10,
    },

    {
      fallback: "lg",
    }
  );

  const swiperSkeletonSize = useBreakpointValue(
    {
      base: 70,
      sm: 90,
      md: 100,
      lg: 110,
      xl: 120,
      "2xl": 120,
    },
    {
      fallback: "lg",
    }
  );

  const onWishlistAdd = async (id) => {
    setWishlist((prevWishlist) => {
      const newItemInWishlist = ItemInWishlist(id);
      const updatedWishlist = newItemInWishlist
        ? prevWishlist.filter((item) => item !== id)
        : [...prevWishlist, id];

      const fetchAndHandleGame = async (id) => {
        try {
          setIsLoading(true);
          const userSelectedGame = await axios.get(
            `https://boardgamegeek.com/xmlapi2/thing?id=${id}`
          );
          const data = userSelectedGame.data;
          // Parsing data from XML to JS - customized code for reading attributes
          const options = {
            ignoreAttributes: false,
            allowBooleanAttributes: true,
          };
          console.log(data);
          const parser = new XMLParser(options);
          let parsedData = parser.parse(data);
          console.log(parsedData);
          const userSelectedGameInfo = parsedData?.items?.item;

          // decoding HTML entities for two scenarios - some games come from API with only one name, some with an array of names
          if (userSelectedGameInfo && userSelectedGameInfo.name[0]) {
            const name = userSelectedGameInfo.name[0];
            const currentName = he.decode(name["@_value"]);
            console.log(currentName);
            userSelectedGameInfo.name["@_value"] = currentName;
            console.log(userSelectedGameInfo.name["@_value"]);
          }

          if (userSelectedGameInfo && userSelectedGameInfo.description) {
            userSelectedGameInfo.description = he.decode(
              userSelectedGameInfo.description
            );
          }

          setSelectedGameInfo(userSelectedGameInfo);

          const updatedLocalStorage =
            JSON.parse(localStorage.getItem("wishlist")) || [];
          if (!updatedLocalStorage.includes(id)) {
            updatedLocalStorage.push(id);
          }
          localStorage.setItem("wishlist", JSON.stringify(updatedLocalStorage));

          // If the game is being updated, set the selected game and open the modal
          if (selectedGame && selectedGame["@_id"] === id) {
            setSelectedGameInfo(userSelectedGameInfo);
            setIsOpen(true);
          }
        } catch (err) {
          throw new Error("Failed to load selected games");
        } finally {
          setIsLoading(false);
        }
      };
      console.log(wishlist);
      // Fetch and handle the game for the newly added ID
      fetchAndHandleGame(id);

      return updatedWishlist;
    });
  };

  useEffect(() => {
    setIsItemOnWishlist(ItemInWishlist(selectedGame && selectedGame["@_id"]));
  }, [wishlist, selectedGame]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <Box
      as="section"
      w="100%"
      bgGradient={`linear-gradient(0deg, ${customTheme.colors.lightBrown} 0%, ${customTheme.colors.darkBrown} 68%)`}
      p="4"
      position="relative"
    >
      <Box
        position="absolute"
        right={{ base: "2", sm: "3" }}
        top={{ base: "2", sm: "3" }}
      >
        <SearchButton position="absolute" top="0" right="0" />
      </Box>
      <Flex
        direction="column"
        justify="center"
        align="center"
        py={{ base: "5", sm: "10" }}
        gap="5"
      >
        <Heading color="white" size={{ base: "lg", sm: "xl" }}>
          Game Night Gossip
        </Heading>
        <Text color="white" align="center" fontSize={{ base: "sm", sm: "md" }}>
          Embark on a mystical journey through the realms of board gaming lore,
          where we unveil the 50 most enchanted and discussed titles, whispered
          about in the hallowed halls of the tabletop community
        </Text>
      </Flex>
      <Flex align="center" justify="center" my={5} pl={{ base: 3, md: 10 }}>
        <Swiper slidesPerView={slidesPerView} grabCursor={true}>
          {parsedHotGames?.map((game) => (
            <SwiperSlide key={game["@_id"]}>
              <Skeleton
                isLoaded={!isLoading}
                w={swiperSkeletonSize}
                h={swiperSkeletonSize}
                borderRadius="5%"
              >
                <GameSwiperImage
                  handleCardClick={handleCardClick}
                  id={game["@_id"]}
                  picture={`${game?.thumbnail["@_value"]}`}
                />
              </Skeleton>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
      {selectedGame && isOpen && (
        <Box pb="10">
          <GameInfoCard
            selectedGame={selectedGame}
            setIsOpen={setIsOpen}
            onWishlistAdd={onWishlistAdd}
            isItemOnWishlist={isItemOnWishlist}
          />
        </Box>
      )}
    </Box>
  );
}

export default TopGamesSection;
