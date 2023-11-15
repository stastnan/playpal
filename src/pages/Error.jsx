import { useNavigate } from "react-router-dom";
import { Center, Heading, Button, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Error({ isErrorPage }) {
  const navigate = useNavigate();
  if (isErrorPage)
    return (
      <Center
        w="100vw"
        h="100vh"
        bgGradient="linear-gradient(0deg, rgba(193,134,91,1) 0%, rgba(53,29,31,1) 68%)"
      >
        <VStack spacing="5">
          <Heading color="white">Something went wrong</Heading>
          <Button size="md" onClick={() => navigate(0)}>
            Go back
          </Button>
        </VStack>
      </Center>
    );

  return (
    <Center
      w="100vw"
      h="100vh"
      bgGradient="linear-gradient(0deg, rgba(193,134,91,1) 0%, rgba(53,29,31,1) 68%)"
    >
      <Heading color="white">Page was not found</Heading>
    </Center>
  );
}
Error.propTypes = {
  isErrorPage: PropTypes.bool,
};

export default Error;
