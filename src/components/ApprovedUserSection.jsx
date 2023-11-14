import { useEffect, useState } from "react";
import {
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

function ApprovedUserSection({ userGames, user }) {
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
      }

      setSelectedGameInfo(userSelectedGameInfo);
    } catch (err) {
      throw Error("Failed to load selected games");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="5"
        p="4"
        w="100%"
        bgGradient={`linear-gradient(0deg, black 0%, ${customTheme.colors.darkBrown} 68%)`}
      >
        <Heading
          size={{ base: "lg", sm: "xl" }}
          color="white"
          py="5"
          align="center"
        >{`This is a personal boardgames shelf of ${user}`}</Heading>
        <SimpleGrid
          spacing="5"
          templateColumns="repeat(auto-fill, minmax(214px, 1fr))"
        >
          {userGames?.map((game) => (
            <Card align="center" key={game["@_objectid"]}>
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
                  >
                    Game info
                  </Button>
                  <Button size={{ base: "md", sm: "sm" }} onClick={onOpen}>
                    Game stats
                  </Button>
                </HStack>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Flex>
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
