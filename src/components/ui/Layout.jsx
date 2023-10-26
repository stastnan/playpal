import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box maxW={{ "2xl": "2048px" }}>
      <Flex
        direction="column"
        align="center"
        m="0 auto"
        bgGradient="linear(rgba(53, 29, 31, 1)
      0%, rgba(96,47,46) 10%, rgba(193,134,92) 50%)"
      >
        <Outlet />
      </Flex>
    </Box>
  );
}

export default Layout;
