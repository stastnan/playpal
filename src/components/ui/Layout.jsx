import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Hero from "src/components/ui/Hero";

function Layout() {
  return (
    <Box maxW={{ "2xl": "2048px" }}>
      <Hero />
      <Flex
        bg="linear(rgba(53, 29, 31, 1)
      0%, rgba(96,47,46) 10%, rgba(193,134,92) 50%)"
        direction="column"
        align="center"
        m="0 auto"
        px="6"
        py="8"
      >
        <Outlet />
      </Flex>
    </Box>
  );
}

export default Layout;
