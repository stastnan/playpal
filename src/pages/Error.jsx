import { useNavigate } from "react-router-dom";
import { HStack, Heading, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Error({ isErrorPage }) {
  const navigate = useNavigate();
  if (isErrorPage)
    return (
      <HStack>
        <Heading>Something went wrong</Heading>
        <Button onClick={() => navigate(0)}>Go back</Button>
      </HStack>
    );

  return (
    <HStack>
      <Heading>Page was not found</Heading>
    </HStack>
  );
}
Error.propTypes = {
  isErrorPage: PropTypes.bool,
};

export default Error;
