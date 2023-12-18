import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import he from "he";
import PropTypes from "prop-types";
import { useBreakpointValue } from "@chakra-ui/react";
import { addToWishlist, deleteFromWishlist } from "src/utils/wishlistSlice";
import { useGetGameByIdQuery } from "src/utils/gamesApi";
import { useDispatch, useSelector } from "react-redux";

import useFindPlayingTimeValue from "src/hooks/useFindPlayingTimeValue";
import useFindYearOfPublishing from "src/hooks/useFindYearOfPublishing";
import useFindMinAndMaxPlayers from "src/hooks/useFindMinAndMaxPlayers";
import useFindMinAge from "src/hooks/useFindMinAge";
import useFindDescription from "src/hooks/useFindDescription";
import { customTheme } from "src/main";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";

function GameInfoCard({ gameId }) {
  const { data, isError, error, isLoading, isSuccess } =
    useGetGameByIdQuery(gameId);

  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);

  const isItemOnWishlist = (gameId) => {
    const result = wishlist.some((item) => item.id === gameId);
    return result;
  };

  const handleWishlist = (gameId) => {
    if (!isItemOnWishlist(gameId)) {
      dispatch(addToWishlist({ id: gameId }));
    } else {
      dispatch(deleteFromWishlist(gameId));
    }
  };

  const { minPlaytime, maxPlaytime } = useFindPlayingTimeValue(data);
  const yearOfPublishing = useFindYearOfPublishing(data);
  const { minPlayers, maxPlayers } = useFindMinAndMaxPlayers(data);
  const minAge = useFindMinAge(data);
  const description = useFindDescription(data);

  let isBigScreen = false;
  isBigScreen = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
    xl: true,
    "2xl": true,
  });

  const content = () => {
    if (isSuccess) {
      return (
        <Card direction={{ sm: "column", xl: "row" }} variant="outline" mb="10">
          {data && (
            <Stack align="start">
              <CardBody>
                <Flex
                  gap="5"
                  align={{ base: "center", lg: "flex-start" }}
                  justify="space-between"
                  direction={{
                    base: "column",
                    lg: "row",
                  }}
                >
                  {!isBigScreen && (
                    <Flex justify="center" align="center" w="100%" p="5">
                      <Skeleton isLoaded={!isLoading}>
                        <Heading size={{ base: "sm", sm: "md" }}>
                          {he.decode(data[0].children[2].attributes.value)}
                          <Badge ml="2">{yearOfPublishing}</Badge>
                        </Heading>
                      </Skeleton>
                    </Flex>
                  )}
                  <Skeleton isLoaded={!isLoading} borderRadius="10">
                    <Image
                      objectFit="contain"
                      src={data[0].children[1].value}
                      alt={he.decode(
                        `${data[0].children[2].attributes.value}'s box picture`
                      )}
                      borderRadius="10"
                      maxW={{
                        base: "250px",
                        sm: "400px",
                        md: "500px",
                        lg: "480px",
                      }}
                    />
                  </Skeleton>
                  <Flex direction="column" p="0">
                    {isBigScreen && (
                      <Skeleton isLoaded={!isLoading} borderRadius="5">
                        <Heading size="md" px="1">
                          {he.decode(data[0].children[2].attributes.value)}
                          <Badge ml="2">{yearOfPublishing}</Badge>
                        </Heading>
                      </Skeleton>
                    )}
                    <Skeleton isLoaded={!isLoading} borderRadius="5">
                      <Text
                        textAlign="justify"
                        p={{ base: "0", lg: "1" }}
                        fontSize={{ base: "sm", sm: "md" }}
                        my="3"
                      >
                        {description}
                      </Text>
                    </Skeleton>

                    <Skeleton isLoaded={!isLoading} borderRadius="5">
                      <Stack
                        direction={{
                          base: "column",
                          sm: "column",
                          md: "column",
                          lg: "row",
                        }}
                      >
                        <Badge>
                          Playing Time:
                          {minPlaytime === maxPlaytime
                            ? ` ${minPlaytime} min`
                            : ` ${minPlaytime} - ${maxPlaytime} min`}
                        </Badge>

                        <Badge>
                          Players:
                          {minPlayers === maxPlayers
                            ? ` ${minPlayers}`
                            : `
        ${minPlayers} - ${maxPlayers}`}
                        </Badge>
                        <Badge>{`Min. Age: ${minAge}`}</Badge>
                        {!isBigScreen && (
                          <Flex mt="10" justify="center">
                            <Tooltip
                              color="white"
                              hasArrow
                              label={
                                isItemOnWishlist(gameId)
                                  ? "This game is already on your wishlist!"
                                  : "Add game to wishlist (See it in the Player section)"
                              }
                              bg={customTheme.colors.darkBrown}
                            >
                              <IconButton
                                isRound
                                icon={
                                  isItemOnWishlist(gameId) ? (
                                    <CheckIcon />
                                  ) : (
                                    <AddIcon />
                                  )
                                }
                                onClick={() => handleWishlist(gameId)}
                              />
                            </Tooltip>
                          </Flex>
                        )}
                      </Stack>
                    </Skeleton>
                    {isBigScreen && wishlist && (
                      <Tooltip
                        hasArrow
                        label={
                          isItemOnWishlist(gameId)
                            ? "This game is already on your wishlist!"
                            : "Add game to wishlist (See it in the Player section)"
                        }
                        bg={customTheme.colors.darkBrown}
                        placement="left"
                        color="white"
                      >
                        <IconButton
                          isRound
                          icon={
                            isItemOnWishlist(gameId) ? (
                              <CheckIcon />
                            ) : (
                              <AddIcon />
                            )
                          }
                          size="sm"
                          right="5"
                          bottom="5"
                          position="absolute"
                          onClick={() => handleWishlist(gameId)}
                        />
                      </Tooltip>
                    )}
                  </Flex>
                </Flex>
              </CardBody>
            </Stack>
          )}
        </Card>
      );
    }
    if (isError) {
      return <Box>{error.error}</Box>;
    }
    // I don't have here code for isLoading variant - if it's loading, there are skeletons in isSuccess statement
  };

  return <>{content()}</>;
}

GameInfoCard.propTypes = {
  gameId: PropTypes.string,
};

export default GameInfoCard;
