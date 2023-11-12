import { Box, Card, Flex, Heading, Image } from "@chakra-ui/react";
import { customTheme } from "src/main";

function ApprovedUserSection({ userGames, user }) {
  return (
    <Flex direction="column" justify="center" align="center" gap="5" px="auto"  
    w="100%"
    bgGradient={`linear-gradient(0deg, black 0%, ${customTheme.colors.darkBrown} 68%)`}
  >
      <Heading color="white" py="5">{`This is a personal boardgames shelf of ${user}`}</Heading>
      <Flex wrap="wrap" gap="10" justify="center" align="center">
        {userGames?.map((game) => (
          <Card maxW="150" maxH="350" key={game["@_objectid"]}>{game.name["#text"]} <Image src={game.thumbnail} /></Card>
        ))}
      </Flex>
    </Flex>
  );
}

export default ApprovedUserSection;
