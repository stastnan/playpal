import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box maxW={{ "2xl": "2048px" }} bg=" rgb(193,134,91)">
      <Flex direction="column" align="center" m="0 auto">
        <Outlet />
      </Flex>
    </Box>
  );
}

export default Layout;
