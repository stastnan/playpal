import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { customTheme } from "src/main";
import UsersGameModal from "src/components/UsersGameModal";
// import WishlistAccordion from "./WishlistAccordion";
import { useGetUserGamesQuery } from "src/utils/gamesApi";
import { selectUsername } from "src/utils/userSlice";
import { selectGameId, setGameId } from "src/utils/selectedGameSlice";

function ApprovedUserSection() {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const selectedGameId = useSelector(selectGameId);
  const { data, isError, error, isSuccess } = useGetUserGamesQuery(username);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleCardClick = (gameId) => {
    dispatch(setGameId(gameId));
    onOpen();
  };

  return (
    <>
      {/* {wishlist && isWishlistVisible && (
        <Box
          bg={customTheme.colors.darkBrown}
          px={{ base: "4", sm: "8", md: "10" }}
          w="100%"
          pb="4"
        >
          {wishlist?.length > 0 && (
            <WishlistAccordion
              wishlist={wishlist}
              parsedHotGames={parsedHotGames}
              isItemOnWishlist={isItemOnWishlist}
              setIsItemOnWishlist={setIsItemOnWishlist}
              setWishlist={setWishlist}
              selectedGameInfo={selectedGameInfo}
              setSelectedGameInfo={setSelectedGameInfo}
              setSelectedGame={setSelectedGame}
              selectedGame={selectedGame}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isGameInfoPage={isGameInfoPage}
              setIsGameInfoPage={setIsGameInfoPage}
            />
          )}
        </Box>
      )} */}

      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="5"
        p="4"
        w="100%"
        pb="20"
        bgGradient={`linear-gradient(0deg, black 0%, ${customTheme.colors.darkBrown} 68%)`}
      >
        {isError && <Center>{error.error ?? "Something went wrong"}</Center>}

        {isSuccess && data && (
          <Heading
            size={{ base: "lg", sm: "xl" }}
            color="white"
            py="5"
            align="center"
          >{`This is the personal boardgames shelf of ${username}`}</Heading>
        )}
        <SimpleGrid
          spacing="5"
          templateColumns="repeat(auto-fill, minmax(214px, 1fr))"
        >
          {isSuccess &&
            data &&
            data.map((game) => (
              <Card
                align="center"
                key={game.attributes.objectid}
                bg={customTheme.colors.lightYellow}
              >
                <CardHeader>
                  <Heading
                    align="center"
                    as="h3"
                    fontSize={{
                      base: "xxs",
                      sm: "sm",
                      md: "md",
                      lg: "lg",
                    }}
                    noOfLines={2}
                  >
                    {game.children[0].value}
                  </Heading>
                </CardHeader>
                <CardBody display="flex" align="center" justify="center">
                  <Image src={game.children[3].value} objectFit="scale-down" />
                </CardBody>
                <CardFooter>
                  <HStack spacing={{ base: 5, sm: 2 }}>
                    <Button
                      size={{ base: "md", sm: "sm" }}
                      onClick={() => handleCardClick(game.attributes.objectid)}
                      bg="#BB8158"
                      color="black"
                      colorScheme={customTheme.colors.lightBrown}
                      _hover={{
                        background: "#F9DAA3",
                        color: "black",
                      }}
                    >
                      Game info
                    </Button>
                    <Button
                      size={{ base: "md", sm: "sm" }}
                      bg="#BB8158"
                      colorScheme={customTheme.colors.lightBrown}
                      color="black"
                      isDisabled
                      _hover={{
                        background: "#F9DAA3",
                        color: "black",
                      }}
                    >
                      Game stats
                    </Button>
                  </HStack>
                </CardFooter>
              </Card>
            ))}
        </SimpleGrid>
      </Flex>
      {selectedGameId && (
        <UsersGameModal
          selectedGameId={selectedGameId}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      <Box>
        <Text>I work!</Text>
      </Box>
    </>
  );
}

export default ApprovedUserSection;
