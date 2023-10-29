import { useState } from "react";
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

function TopGamesSection({ parsedHotGames, isLoading }) {
  const [selectedGame, setSelectedGame] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (id) => {
    const selectedGame = parsedHotGames.find((game) => game["@_id"] === id);
    setIsOpen(true);
    setSelectedGame(selectedGame);
  };

  const variant = useBreakpointValue(
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

  return (
    <Box
      as="section"
      w="100vw"
      bgGradient={`linear-gradient(0deg, ${customTheme.colors.lightBrown} 0%, ${customTheme.colors.darkBrown} 68%)`}
      p="4"
    >
      <Flex direction="column" justify="center" align="center" pb={10}>
        <Heading size="xl" color="white">
          Top Gems
        </Heading>
        <Text color="white">
          Which of these top gems will you add to your collection?
        </Text>
      </Flex>
      <Flex align="center" justify="center" my={5} pl={{ base: 3, md: 10 }}>
        <Swiper
          slidesPerView={variant}
          grabCursor={true}
          // modules={[Pagination]}
        >
          {!isLoading &&
            parsedHotGames?.map((game) => (
              <SwiperSlide key={game["@_id"]}>
                <GameSwiperImage
                  handleCardClick={handleCardClick}
                  id={game["@_id"]}
                  picture={`${game?.thumbnail["@_value"]}`}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        {isLoading &&
          [...Array(10).keys()].map((num) => (
            <Skeleton key={num} w="7rem" h="7rem" borderRadius="5%" />
          ))}
      </Flex>
      <Box>
        {selectedGame && isOpen && (
          <GameInfoCard
            games={parsedHotGames}
            selectedGame={selectedGame}
            setIsOpen={setIsOpen}
          />
        )}
      </Box>
    </Box>
  );
}

export default TopGamesSection;
