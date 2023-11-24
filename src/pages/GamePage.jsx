import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import he from "he";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import GameInfoCard from "src/components/GameInfoCard";
import AlternativeBanner from "src/components/ui/AlternativeBanner";
import { customTheme } from "src/main";

function GamePage({ setIsGameInfoPage, isGameInfoPage }) {
  console.log(isGameInfoPage);
  //FIX: state for isGameInfoPage

  const { gameId } = useParams();
  const [gameDetail, setGameDetail] = useState();
  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(
          `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}`
        );
        const data = response.data;
        console.log(data);
        // Parsing data from XML to JS - customized code for reading attributes
        const options = {
          ignoreAttributes: false,
          allowBooleanAttributes: true,
        };
        const parser = new XMLParser(options);
        let parsedData = parser.parse(data);
        const gameInfo = parsedData?.items?.item;
        console.log(gameInfo);
        if (gameInfo && gameInfo.name[0]) {
          const name = gameInfo.name[0];
          const currentName = he.decode(name["@_value"]);
          gameInfo.name["@_value"] = currentName;
        }
        setGameDetail(gameInfo);
        console.log(gameDetail);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetail();
  }, []);

  return (
    <Box
      p="5"
      bgGradient={`linear-gradient(0deg, ${customTheme.colors.lightBrown} 0%, ${customTheme.colors.darkBrown} 38%)`}
      color={customTheme.colors.lightYellow}
      minH="100vh"
    >
      <AlternativeBanner />
      <Link to="/search">
        <IconButton
          mt="5"
          isRound
          color={customTheme.colors.lightBrown}
          icon={<ArrowBackIcon />}
          onClick={setIsGameInfoPage(false)}
        />
      </Link>
      {gameDetail && (
        <GameInfoCard
          setIsGameInfoPage={setIsGameInfoPage}
          selectedGame={gameDetail}
          isGameInfoPage={isGameInfoPage}
        />
      )}
    </Box>
  );
}

export default GamePage;
