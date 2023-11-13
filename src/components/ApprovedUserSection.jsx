import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { customTheme } from "src/main";

function ApprovedUserSection({ userGames, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState("");

  const handleCardClick = (id) => {
    const selectedGame = userGames.find((game) => game["@_objectid"] === id);
    setIsOpen(true);
    setSelectedGame(selectedGame);
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="5"
      px="auto"
      w="100%"
      bgGradient={`linear-gradient(0deg, black 0%, ${customTheme.colors.darkBrown} 68%)`}
    >
      <Heading
        color="white"
        py="5"
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
              <Image
                src={game.thumbnail}
                objectFit="scale-down"
                onClick={handleCardClick}
              />
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default ApprovedUserSection;
