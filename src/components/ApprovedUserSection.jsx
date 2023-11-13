import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { customTheme } from "src/main";
import UsersGameModal from "src/components/UsersGameModal";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

function ApprovedUserSection({ userGames, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedGameInfo, setSelectedGameInfo] = useState();
  const { onOpen } = useDisclosure();

  const handleCardClick = (id) => {
    if (id) {
      const findSelectedGameId = userGames.find(
        (game) => id === game["@_objectid"]
      );

      setIsOpen(true);
      setSelectedGame(findSelectedGameId["@_objectid"]);
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
      };
      const parser = new XMLParser(options);
      let parsedData = parser.parse(data);
      const userSelectedGameInfo = parsedData?.items;

      setSelectedGameInfo(userSelectedGameInfo.item);
      console.log(selectedGameInfo);
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
          spacing={5}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
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
                <Button onClick={() => handleCardClick(game["@_objectid"])}>
                  View here
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Flex>
      {/* {selectedGameInfo && !isOpen && (
        <UsersGameModal selectedGameInfo={selectedGameInfo} />
      )} */}
    </>
  );
}

export default ApprovedUserSection;
