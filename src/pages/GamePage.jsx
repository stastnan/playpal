import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import he from "he";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GameInfoCard from "src/components/GameInfoCard";
import AlternativeBanner from "src/components/ui/AlternativeBanner";
import { customTheme } from "src/main";
import { useGetGameByIdQuery } from "src/utils/gamesApi";

function GamePage({ setIsGameInfoPage, isGameInfoPage }) {
  //FIX: state for isGameInfoPage

  const { gameId } = useParams();
  const [gameDetail, setGameDetail] = useState();

  // useEffect(() => {
  //   const fetchGameDetail = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}`
  //       );
  //       const data = response.data;
  //       console.log(data);
  //       // Parsing data from XML to JS - customized code for reading attributes
  //       const options = {
  //         ignoreAttributes: false,
  //         allowBooleanAttributes: true,
  //       };
  //       const parser = new XMLParser(options);
  //       let parsedData = parser.parse(data);
  //       const gameInfo = parsedData?.items?.item;
  //       console.log(gameInfo);
  //       if (gameInfo && gameInfo.name[0]) {
  //         const name = gameInfo.name[0];
  //         const currentName = he.decode(name["@_value"]);
  //         gameInfo.name["@_value"] = currentName;
  //       }
  //       setGameDetail(gameInfo);
  //       console.log(gameDetail);
  //     } catch (error) {
  //       toast.error("Error fetching game details:", error);
  //     }
  //   };

  //   fetchGameDetail();
  // }, []);

  return (
    <Box
      bgGradient={`linear-gradient(0deg, ${customTheme.colors.lightBrown} 0%, ${customTheme.colors.darkBrown} 38%)`}
      color={customTheme.colors.lightYellow}
      minH="100vh"
    >
      <AlternativeBanner />
      <Box p="5">
        <Link to="/">
          <IconButton
            mt="5"
            isRound
            color={customTheme.colors.lightBrown}
            icon={<ArrowBackIcon />}
            // onClick={setIsGameInfoPage(false)}
          />
        </Link>

        <GameInfoCard
          gameId={gameId}
          // setIsGameInfoPage={setIsGameInfoPage}
          // selectedGame={gameDetail}
          // isGameInfoPage={isGameInfoPage}
        />
      </Box>
    </Box>
  );
}

export default GamePage;
