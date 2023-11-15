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
import WishlistAccordion from "src/components/WishlistAccordion";
function TopGamesSection({ parsedHotGames, isLoading }) {
  const [selectedGame, setSelectedGame] = useState();
  const [isOpen, setIsOpen] = useState(false);
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

  const ItemInWishlist = (id) => {
    return wishlist.includes(id);
  };

  const onWishlistAdd = (id) => {
    setWishlist((prevWishlist) => {
      const newItemInWishlist = ItemInWishlist(id);
      const updatedWishlist = newItemInWishlist
        ? prevWishlist.filter((item) => item !== id)
        : [...prevWishlist, id];

      const isUpdatingSelectedGame =
        selectedGame && selectedGame["@_id"] === id;

      if (isUpdatingSelectedGame) {
        setIsItemOnWishlist(!newItemInWishlist);
      }

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
    >
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

      {wishlist?.length > 0 && (
        <WishlistAccordion
          wishlist={wishlist}
          parsedHotGames={parsedHotGames}
          isItemOnWishlist={isItemOnWishlist}
          setIsItemOnWishlist={setIsItemOnWishlist}
          setWishlist={setWishlist}
        />
      )}
    </Box>
  );
}

export default TopGamesSection;
