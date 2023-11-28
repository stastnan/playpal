import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import he from "he";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { customTheme } from "src/main";
import UsersGameModal from "src/components/UsersGameModal";
import WishlistAccordion from "./WishlistAccordion";
import { toast } from "react-toastify";

function ApprovedUserSection({
  userGames,
  user,
  wishlist,
  parsedHotGames,
  isItemOnWishlist,
  setIsItemOnWishlist,
  setWishlist,
  isWishlistVisible,
  setIsWishlistVisible,
  isGameInfoPage,
  setIsGameInfoPage,
}) {
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedGameInfo, setSelectedGameInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleCardClick = (id) => {
    if (id) {
      const findSelectedGameId = userGames.find(
        (game) => id === game["@_objectid"]
      );

      setSelectedGame(findSelectedGameId["@_objectid"]);
      onOpen();
    }
  };

  useEffect(() => {
    if (selectedGame) {
      fetchSelectedGame(selectedGame);
    }
  }, [selectedGame]);

  const fetchSelectedGame = async () => {
    try {
      setIsLoading(true);
      const userSelectedGame = await axios.get(
        `https://boardgamegeek.com/xmlapi2/thing?id=${selectedGame}`
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
      console.log(userSelectedGameInfo);

      // decoding HTML entities for two scenarions - some games come from API with only one name, some with an array of names
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
        console.log(userSelectedGameInfo.description);
      }

      setSelectedGameInfo(userSelectedGameInfo);
    } catch (err) {
      toast.error("Failed to load selected games");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(wishlist);
  console.log(selectedGame);
  console.log(selectedGameInfo);
  return (
    <>
      {wishlist && isWishlistVisible && (
        <Box
          bg={customTheme.colors.darkBrown}
          px={{ base: "4", sm: "8", md: "10" }}
          w="100%"
          pb="4"
        >
          {wishlist?.length > 0 && (
            <WishlistAccordion
              wishlist={wishlist}
              parsedHotGames={parsedHotGames}
              isItemOnWishlist={isItemOnWishlist}
              setIsItemOnWishlist={setIsItemOnWishlist}
              setWishlist={setWishlist}
              selectedGameInfo={selectedGameInfo}
              setSelectedGameInfo={setSelectedGameInfo}
              setSelectedGame={setSelectedGame}
              selectedGame={selectedGame}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isGameInfoPage={isGameInfoPage}
              setIsGameInfoPage={setIsGameInfoPage}
            />
          )}
        </Box>
      )}
      {selectedGameInfo && (
        <Flex
          direction="column"
          justify="center"
          align="center"
          gap="5"
          p="4"
          w="100%"
          pb="20"
          bgGradient={`linear-gradient(0deg, black 0%, ${customTheme.colors.darkBrown} 68%)`}
        >
          {selectedGameInfo && (
            <Heading
              size={{ base: "lg", sm: "xl" }}
              color="white"
              py="5"
              align="center"
            >{`This is the personal boardgames shelf of ${user}`}</Heading>
          )}
          {/* <UserGameFilter userGames={userGames} /> */}
          <SimpleGrid
            spacing="5"
            templateColumns="repeat(auto-fill, minmax(214px, 1fr))"
          >
            {userGames?.map((game) => (
              <Card
                align="center"
                key={game["@_objectid"]}
                bg={customTheme.colors.lightYellow}
              >
                <CardHeader>
                  <Heading
                    align="center"
                    as="h3"
                    fontSize={{
                      base: "xxs",
                      sm: "sm",
                      md: "md",
                      lg: "lg",
                    }}
                    noOfLines={2}
                  >
                    {game.name["#text"]}
                  </Heading>
                </CardHeader>
                <CardBody display="flex" align="center" justify="center">
                  <Image src={game.thumbnail} objectFit="scale-down" />
                </CardBody>
                <CardFooter>
                  <HStack spacing={{ base: 5, sm: 2 }}>
                    <Button
                      size={{ base: "md", sm: "sm" }}
                      onClick={() => handleCardClick(game["@_objectid"])}
                      bg="#BB8158"
                      color="black"
                      colorScheme={customTheme.colors.lightBrown}
                      _hover={{
                        background: "#F9DAA3",
                        color: "black",
                      }}
                    >
                      Game info
                    </Button>
                    <Button
                      size={{ base: "md", sm: "sm" }}
                      bg="#BB8158"
                      colorScheme={customTheme.colors.lightBrown}
                      color="black"
                      isDisabled
                      _hover={{
                        background: "#F9DAA3",
                        color: "black",
                      }}
                    >
                      Game stats
                    </Button>
                  </HStack>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </Flex>
      )}

      {selectedGameInfo && (
        <UsersGameModal
          selectedGameInfo={selectedGameInfo}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default ApprovedUserSection;
