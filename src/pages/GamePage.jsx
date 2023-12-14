import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, IconButton } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import GameInfoCard from "src/components/GameInfoCard";
import AlternativeBanner from "src/components/ui/AlternativeBanner";
import { customTheme } from "src/main";

function GamePage() {
  const { gameId } = useParams();

  return (
    <Box
      bgGradient={`linear-gradient(0deg, ${customTheme.colors.lightBrown} 0%, ${customTheme.colors.darkBrown} 38%)`}
      color={customTheme.colors.lightYellow}
      minH="100vh"
    >
      <AlternativeBanner />
      <Flex
        direction="column"
        justify="center"
        align={{ base: "center", lg: "start" }}
        p="5"
        gap="5"
      >
        <Center h="100%" py="2">
          <Link to="/">
            <IconButton
              isRound
              variant="ghost"
              color={customTheme.colors.lightBrown}
              icon={<ArrowBackIcon />}
            />
          </Link>
        </Center>

        <GameInfoCard gameId={gameId} />
      </Flex>
    </Box>
  );
}

export default GamePage;
