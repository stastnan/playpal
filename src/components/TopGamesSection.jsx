import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import GameSwiperImage from "src/components/GameSwiperImage";
import { customTheme } from "src/main";
import SearchButton from "./SearchButton";
import { useGetHotGamesQuery } from "src/utils/gamesApi";

function TopGamesSection() {
  const { data, isError, error, isLoading, isSuccess } = useGetHotGamesQuery();

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

  const content = () => {
    if (isLoading) {
      return (
        <Center>
          <Spinner color={customTheme.colors.darkBrown} />
        </Center>
      );
    }
    if (isSuccess) {
      return (
        <Flex align="center" justify="center" my="5" pl={{ base: 3, md: 10 }}>
          <Swiper slidesPerView={slidesPerView} grabCursor={true}>
            {data?.map((game) => (
              <SwiperSlide key={game.attributes.id}>
                <Link to={`/games/${game.attributes.id}`}>
                  <GameSwiperImage
                    picture={game.children[0].attributes.value}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      );
    }

    if (isError) {
      return <Center>{error?.error ?? "Something went wrong"}</Center>;
    }
  };
  // const onWishlistAdd = async (id) => {
  //   setWishlist((prevWishlist) => {
  //     const newItemInWishlist = ItemInWishlist(id);
  //     const updatedWishlist = newItemInWishlist
  //       ? prevWishlist.filter((item) => item !== id)
  //       : [...prevWishlist, id];

  //     const fetchAndHandleGame = async (id) => {
  //       try {
  //         setIsLoading(true);
  //         const userSelectedGame = await axios.get(
  //           `https://boardgamegeek.com/xmlapi2/thing?id=${id}`
  //         );
  //         const data = userSelectedGame.data;
  //         // Parsing data from XML to JS - customized code for reading attributes
  //         const options = {
  //           ignoreAttributes: false,
  //           allowBooleanAttributes: true,
  //         };
  //         console.log(data);
  //         const parser = new XMLParser(options);
  //         let parsedData = parser.parse(data);
  //         console.log(parsedData);
  //         const userSelectedGameInfo = parsedData?.items?.item;
  //         console.log(userSelectedGameInfo);
  //         // decoding HTML entities for two scenarios - some games come from API with only one name, some with an array of names
  //         if (userSelectedGameInfo && userSelectedGameInfo.name[0]) {
  //           const name = userSelectedGameInfo.name[0];
  //           const currentName = he.decode(name["@_value"]);
  //           console.log(currentName);
  //           userSelectedGameInfo.name["@_value"] = currentName;
  //           console.log(userSelectedGameInfo.name["@_value"]);
  //         }

  //         if (userSelectedGameInfo && userSelectedGameInfo.description) {
  //           userSelectedGameInfo.description = he.decode(
  //             userSelectedGameInfo.description
  //           );
  //         }

  //         setSelectedGameInfo(userSelectedGameInfo);

  //         const updatedLocalStorage =
  //           JSON.parse(localStorage.getItem("wishlist")) || [];
  //         if (!updatedLocalStorage.includes(id)) {
  //           updatedLocalStorage.push(id);
  //         }
  //         localStorage.setItem("wishlist", JSON.stringify(updatedLocalStorage));

  //         // If the game is being updated, set the selected game and open the modal
  //         if (selectedGame && selectedGame["@_id"] === id) {
  //           setSelectedGameInfo(userSelectedGameInfo);
  //           setIsOpen(true);
  //         }
  //       } catch (err) {
  //         toast.error("Failed to load selected games");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     console.log(wishlist);
  //     fetchAndHandleGame(id);

  //     return updatedWishlist;
  //   });
  // };

  // useEffect(() => {
  //   setIsItemOnWishlist(ItemInWishlist(selectedGame && selectedGame["@_id"]));
  // }, [wishlist, selectedGame]);

  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(wishlist));
  // }, [wishlist]);

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
      {content()}
    </Box>
  );
}

export default TopGamesSection;
