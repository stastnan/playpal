import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { SiBoardgamegeek } from "react-icons/si";

import { customTheme } from "src/main";

function Footer() {
  return (
    <Box
      w="100%"
      //   bg={
      //     userGames
      //       ? `linear-gradient(0deg, black 2%, ${customTheme.colors.darkBrown} 68%)`
      //       : "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 1%)"
      //   }
    >
      <Flex
        as="footer"
        color="white"
        p="10"
        justify={{ base: "center", sm: "flex-end", md: "center" }}
        align="center"
        gap={{ base: 3, md: 10 }}
        direction={{ base: "column", sm: "row" }}
      >
        <Text fontSize={{ base: "md", sm: "sm", md: "lg" }}>
          Which way will you continue?
        </Text>
        <a href="mailto:nik.stastna@gmail.com">
          <Button size={{ base: "xs", md: "sm" }} leftIcon={<SiGmail />}>
            Gmail
          </Button>
        </a>

        <a href="https://instagram.com/playpal" target="blank">
          <Button size={{ base: "xs", md: "sm" }} leftIcon={<FaInstagram />}>
            Instagram
          </Button>
        </a>

        <a href="https://boardgamegeek.com" target="blank">
          <Button
            size={{ base: "xs", md: "sm" }}
            leftIcon={<SiBoardgamegeek />}
          >
            BoardgameGeek
          </Button>
        </a>
      </Flex>
    </Box>
  );
}

export default Footer;
