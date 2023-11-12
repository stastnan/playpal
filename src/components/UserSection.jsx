import { Box, Flex, Heading } from "@chakra-ui/react";
import { UnlockIcon } from "@chakra-ui/icons";

import { customTheme } from "src/main";
import UserInput from "src/components/ui/UserInput";

function UserSection() {
  console.log(UnlockIcon);
  return (
    <Box
      as="section"
      w="100%"
      bgGradient={`linear-gradient(0deg, ${customTheme.colors.darkBrown} 0%, ${customTheme.colors.lightBrown} 68%)`}
      p="4"
    >
      <Flex w="100%" align="center" justify="center" direction="column" pt="10">
        <Heading size="xl">Player Section</Heading>
        <UserInput placeholder="Your BGG username" icon={<UnlockIcon />} />
      </Flex>
    </Box>
  );
}

export default UserSection;
