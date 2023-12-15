import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { UnlockIcon } from "@chakra-ui/icons";
import { customTheme } from "src/main";
import UserInput from "src/components/ui/UserInput";

import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "src/utils/userSlice";
import { selectIsClicked, setClicked } from "src/utils/buttonSlice";
import ApprovedUserSection from "./ApprovedUserSection";

function UserSection() {
  const dispatch = useDispatch();
  const isButtonClicked = useSelector(selectIsClicked);

  const username = useSelector(selectUsername);

  const handleButtonClick = () => {
    console.log("Button clicked");
    if (username.trim() !== "") {
      console.log("Setting isButtonClicked to true");
      dispatch(setClicked(true));
    } else {
      toast.error("Please enter your BGG username.");
    }
  };

  return (
    <>
      <Box
        as="section"
        w="100%"
        bgGradient={`linear-gradient(0deg, ${customTheme.colors.darkBrown} 0%, ${customTheme.colors.lightBrown} 68%)`}
        p="4"
      >
        <Divider borderColor={customTheme.colors.darkBrown} />
        <Flex
          w="100%"
          align="center"
          justify="center"
          direction="column"
          mt="8"
        >
          <Heading size={{ base: "lg", sm: "xl" }}>Player Section</Heading>
          <Text align="center" fontSize={{ base: "sm", sm: "md" }}>
            Forge your personal saga within the realm of legendary board games.
            To summon your gaming chronicles into our mystical archive, invoke
            your BoardGameGeek username:
          </Text>
          <HStack py="10" spacing="3">
            <UserInput placeholder="Your BGG username" />
            <IconButton
              variant="solid"
              colorScheme="gray"
              icon={<UnlockIcon />}
              isRound
              onClick={handleButtonClick}
            />
          </HStack>
        </Flex>
      </Box>
      {isButtonClicked && <ApprovedUserSection />}
    </>
  );
}

export default UserSection;
