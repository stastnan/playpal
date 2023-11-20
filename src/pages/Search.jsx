import { Box, Flex, Heading, Image, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useState, useEffect } from "react";
import Listing from "src/components/Listing";
import searchBanner from "src/assets/images/banner-search.png";
import { customTheme } from "src/main";

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState();
  const [searchQuery, setSearchQuery] = useState("");

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
        setIsLoading(true);
      }
    };

    if (searchQuery) {
      search(searchQuery);
    }
  }, [searchQuery]);

  return (
    <Box
      bgGradient={`linear-gradient(0deg, ${customTheme.colors.lightBrown} 0%, ${customTheme.colors.darkBrown} 38%)`}
      color={customTheme.colors.lightYellow}
      h="100vh"
      overflow="hidden"
    >
      <Image
        src={searchBanner}
        w="100%"
        alt="banner for search page - fantasy landscape and shelf with boardgames"
      />
      <Box p="4">
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
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            _placeholder={{ color: customTheme.colors.lightYellow }}
          />
        </Flex>
        <Box p="4">
          {searchQuery && (
            <Box overflow="hidden">
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
  );
}

export default Search;
