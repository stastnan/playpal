import {
  Badge,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import he from "he";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useState, useEffect, useRef } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { customTheme } from "src/main";

let currentName = null;

function GameInfoCard({ selectedGame, setIsOpen }) {
  const [currentGame, setCurrentGame] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        setIsLoading(true);

        const game = await axios.get(
          `https://boardgamegeek.com/xmlapi2/thing?id=${selectedGame["@_id"]}`
        );
        const data = game?.data;

        // Parsing data from XML to JS with attributes
        const options = {
          ignoreAttributes: false,
        };
        const parser = new XMLParser(options);
        let parsedData = parser.parse(data);

        const gameInfo = parsedData?.items?.item;
        console.log(gameInfo);

        // decoding HTML entities for two scenarions - some games come from API with only one name, some with an array of names
        if (gameInfo && gameInfo.name[0]) {
          const name = gameInfo.name[0];
          currentName = he.decode(name["@_value"]);
          console.log(currentName);
          gameInfo.name["@_value"] = currentName;
        }

        if (gameInfo && gameInfo.description) {
          gameInfo.description = he.decode(gameInfo.description);
        }

        console.log(gameInfo.name["@_value"]);

        setCurrentGame(gameInfo);
      } catch (err) {
        throw Error("Failed to load game information");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGameInfo();
  }, [selectedGame]);

  useEffect(() => {
    cardRef.current.focus();
  }, [currentGame]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const isBigScreen = useBreakpointValue(
    {
      base: false,
      sm: false,
      md: false,
      lg: true,
      xl: true,
      "2xl": true,
    },
    {
      fallback: "lg",
    }
  );

  return (
    <Card
      direction={{ sm: "column", xl: "row" }}
      variant="outline"
      mt={20}
      bgColor={customTheme.colors.lightYellow}
      border="none"
    >
      <Stack align="start">
        <CardBody>
          <Flex
            gap="5"
            align={{ base: "center", lg: "flex-start" }}
            justify="space-between"
            direction={{
              base: "column",
              lg: "row",
            }}
          >
            {!isBigScreen && (
              <Flex justify="space-between" align="center" w="100%" p="5">
                <Skeleton isLoaded={!isLoading}>
                  <Heading size={{ base: "sm", sm: "md" }} ref={cardRef}>
                    {currentGame?.name["@_value"]}
                    <Badge>{currentGame?.yearpublished["@_value"]}</Badge>
                  </Heading>
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>
                  <IconButton
                    isRound={true}
                    variant="solid"
                    colorScheme="gray"
                    fontSize="10px"
                    size="xs"
                    icon={<CloseIcon />}
                    onClick={handleClose}
                  />
                </Skeleton>
              </Flex>
            )}
            <Skeleton isLoaded={!isLoading} borderRadius="10">
              <Image
                objectFit="contain"
                src={currentGame?.image}
                alt={`${currentGame}'s box picture`}
                borderRadius="10"
                maxW={{ base: "250px", sm: "400px", md: "500px", lg: "480px" }}
              />
            </Skeleton>

            <Flex direction="column" gap="5" p="0">
              {isBigScreen && (
                <Skeleton isLoaded={!isLoading} borderRadius="5">
                  <Flex justify="space-between" align="center">
                    <Heading size="md" ref={cardRef} px="1">
                      {currentGame?.name["@_value"]}
                      <Badge>{`(${currentGame?.yearpublished["@_value"]})`}</Badge>
                    </Heading>

                    <IconButton
                      isRound={true}
                      variant="solid"
                      colorScheme="gray"
                      fontSize="10px"
                      size="xs"
                      icon={<CloseIcon />}
                      onClick={handleClose}
                    />
                  </Flex>
                </Skeleton>
              )}
              <Skeleton isLoaded={!isLoading} borderRadius="5">
                <Text
                  textAlign="justify"
                  p={{ base: "0", lg: "1" }}
                  fontSize={{ base: "sm", sm: "md" }}
                >
                  {currentGame?.description}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoading} borderRadius="5">
                <Stack
                  direction={{
                    base: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                  }}
                >
                  <Badge>
                    Playing Time:
                    {currentGame?.minplaytime["@_value"] ===
                    currentGame?.maxplaytime["@_value"]
                      ? ` ${currentGame?.minplaytime["@_value"]} min`
                      : ` ${currentGame?.minplaytime["@_value"]} - ${currentGame?.maxplaytime["@_value"]} min`}
                  </Badge>

                  <Badge>
                    Players:
                    {currentGame?.minplayers["@_value"] ===
                    currentGame?.maxplayers["@_value"]
                      ? ` ${currentGame?.minplayers["@_value"]}`
                      : `
                        ${currentGame?.minplayers["@_value"]} - ${currentGame?.maxplayers["@_value"]}`}
                  </Badge>
                  <Badge>{`Min. Age: ${currentGame?.minage["@_value"]}`}</Badge>
                </Stack>
              </Skeleton>
            </Flex>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
}

export default GameInfoCard;
