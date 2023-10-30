import { Box, Flex } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";
import { customTheme } from "src/main";

function Layout() {
  return (
    <Box
      backgroundSize="cover"
      backgroundPosition="center"
      bg={customTheme.colors.backgroundBrown}
      m=" 0 auto"
      h="100vh"
    >
      <Flex direction="column" align="center" m=" 0 auto" maxW="2048px">
        <Outlet />
      </Flex>
    </Box>
  );
}

export default Layout;
