import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useState, useEffect, useRef } from "react";
import Listing from "src/components/Listing";
import { customTheme } from "src/main";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import alternativeBannerBase from "src/assets/images/alternative-banner/banner-search-sm.jpg";
import alternativeBannerSM from "src/assets/images/alternative-banner/banner-search-md.jpg";
import alternativeBannerMD from "src/assets/images/alternative-banner/banner-search-lg.jpg";
import alternativeBannerLG from "src/assets/images/alternative-banner/banner-search-xl.jpg";
import alternativeBannerXL from "src/assets/images/alternative-banner/banner-search-2xl.jpg";
import alternativeBanner2XL from "src/assets/images/alternative-banner/banner-search-3xl.jpg";

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const search = async (searchQuery) => {
      try {
        setIsLoading(true);

        const data = await axios(
          `https://boardgamegeek.com/xmlapi2/search?query=${searchQuery}&type=boardgame`
        );

        if (!data?.data) throw Error("Failed to load games!");

        console.log(data.data);
        const results = data.data;

        const options = {
          ignoreAttributes: false,
        };
        const parser = new XMLParser(options);
        let parsedData = parser.parse(results);

        // const parsedGames = parsedData;
        const gamesArray = parsedData?.items?.item;
        console.log(gamesArray);

        setGames(gamesArray);
      } catch (err) {
        throw Error("Failed to load games!");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      search(searchQuery);
    }
  }, [searchQuery]);

  const imageSource = useBreakpointValue(
    {
      base: alternativeBannerBase,
      sm: alternativeBannerSM,
      md: alternativeBannerMD,
      lg: alternativeBannerLG,
      xl: alternativeBannerXL,
      "2xl": alternativeBanner2XL,
    },
    {
      fallback: "alternativeBannerLG",
    }
  );

  return (
    <Box
      bgGradient={`linear-gradient(0deg, ${customTheme.colors.lightBrown} 0%, ${customTheme.colors.darkBrown} 38%)`}
      color={customTheme.colors.lightYellow}
      minH="100vh"
      // objectFit="cover"
    >
      <Image
        src={imageSource}
        w="100%"
        alt="banner for search page - fantasy landscape and shelf with boardgames"
      />
      <Box p="4" overflow="hidden">
        <Link to="/">
          <IconButton
            icon={<ArrowBackIcon />}
            isRound
            variant="ghost"
            size={{ base: "xs", sm: "md" }}
            color={customTheme.colors.lightBrown}
          />
        </Link>
        <Flex align="center" justify="center" py="5" direction="column" gap="5">
          <Heading size={{ base: "lg", sm: "xl" }}>Gamefinder's Haven</Heading>
          <Text fontSize={{ base: "sm", sm: "md" }} textAlign="center">
            Welcome to the haven for seekers of gaming excellence! Enter the
            Gamefinder's Haven, where your desires manifest with each search,
            guiding you to the tabletop wonders you seek
          </Text>
          <Input
            mt="4"
            color={customTheme.colors.lightYellow}
            w="50%"
            value={searchQuery}
            ref={inputRef}
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            _placeholder={{ color: customTheme.colors.lightYellow }}
          />
        </Flex>
        <Box overflow="hidden">
          <Box p="4" maxH="1042px">
            {searchQuery && (
              <Box>
                <Heading as="h3">Results by: {searchQuery}</Heading>
                {games?.length > 0 && (
                  <Listing isLoading={isLoading} games={games} />
                )}
              </Box>
            )}
          </Box>
          {searchQuery && !isLoading && games?.length <= 0 && (
            <Text>Sorry, nothing was found</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Search;
