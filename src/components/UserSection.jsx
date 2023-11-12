import { Box, Flex, HStack, Heading, IconButton, Text } from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

import { customTheme } from "src/main";
import UserInput from "src/components/ui/UserInput";
import { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";
import ApprovedUserSection from "./ApprovedUserSection";

function UserSection() {
  const [user, setUser] = useState("");
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [userGames, setUserGames] = useState();

  useEffect(() => {
    if (userName) {
      loadApprovedUserSection(userName);
    }
  }, [user]);

  function loadApprovedUserSection(userName) {


    if (userName) {
      setUser(userName);
      console.log(user);
    }
    const fetchUserGames = async () => {
      try {
        setIsLoading(true);
        const userGames = await axios.get(
          `https://boardgamegeek.com/xmlapi2/collection?username=${user}&subtype=boardgame&own=1`
        );
        const data = userGames?.data;
        // Parsing data from XML to JS - customized code for reading attributes
        const options = {
          ignoreAttributes: false,
        };
        const parser = new XMLParser(options);
        let parsedData = parser.parse(data);
        console.log(data);
        const userGamesArray = parsedData?.items?.item;
        console.log(userGamesArray);
        setUserGames(userGamesArray);
      } catch (err) {
        throw Error("Failed to load user games");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserGames(user);
  }

  return (
    <>
    <Box
      as="section"
      w="100%"
      
      bgGradient={`linear-gradient(0deg, ${customTheme.colors.darkBrown} 0%, ${customTheme.colors.lightBrown} 68%)`}
      p="4"
    >
      <Flex w="100%" align="center" justify="center" direction="column" pt="10">
        <Heading size="xl">Player Section</Heading>
        <Text align="center" fontSize={{ base: "sm", sm: "md" }}>
          Forge your personal saga within the realm of legendary board games. To
          summon your gaming chronicles into our mystical archive, invoke your
          BoardGameGeek username:
        </Text>
        <HStack py="10" spacing="3">
          <UserInput
            placeholder="Your BGG username"
            setUserName={setUserName}
            user={user}
          />
          <IconButton
            variant="solid"
            colorScheme="gray"
            icon={<UnlockIcon />}
            onClick={loadApprovedUserSection}
          />
        </HStack>
      </Flex>
     
    </Box>
     {user &&
        <ApprovedUserSection userGames={userGames} user={user} />}
</>
  );
}

export default UserSection;
