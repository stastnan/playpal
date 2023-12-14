import {
  Badge,
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import he from "he";
import { useBreakpointValue } from "@chakra-ui/react";
import useFindPlayingTimeValue from "src/hooks/useFindPlayingTimeValue";
import { useGetGameByIdQuery } from "src/utils/gamesApi";
import useFindYearOfPublishing from "src/hooks/useFindYearOfPublishing";
import useFindMinAndMaxPlayers from "src/hooks/useFindMinAndMaxPlayers";
import useFindMinAndMaxAge from "src/hooks/useFindMinAge";
import useFindDescription from "src/hooks/useFindDescription";

function GameInfoCard({ gameId }) {
  const { data, isError, error, isLoading, isSuccess } =
    useGetGameByIdQuery(gameId);
  console.log(data);
  const { minPlaytime, maxPlaytime } = useFindPlayingTimeValue(data);
  const yearOfPublishing = useFindYearOfPublishing(data);
  const { minPlayers, maxPlayers } = useFindMinAndMaxPlayers(data);
  const minAge = useFindMinAndMaxAge(data);
  const description = useFindDescription(data);
  console.log(description);

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
        <Card direction={{ sm: "column", xl: "row" }} variant="outline" mt="20">
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
                    <Flex justify="space-between" align="center" w="100%" p="5">
                      <Skeleton isLoaded={!isLoading}>
                        <Heading size={{ base: "sm", sm: "md" }}>
                          {he.decode(data[0].children[2].attributes.value)}
                          <Badge>{yearOfPublishing}</Badge>
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
                  <Flex direction="column" gap="5" p="0">
                    {isBigScreen && (
                      <Skeleton isLoaded={!isLoading} borderRadius="5">
                        <Heading size="md" px="1">
                          {he.decode(data[0].children[2].attributes.value)}
                          <Badge>{yearOfPublishing}</Badge>
                        </Heading>
                      </Skeleton>
                    )}
                    <Skeleton isLoaded={!isLoading} borderRadius="5">
                      <Text
                        textAlign="justify"
                        p={{ base: "0", lg: "1" }}
                        fontSize={{ base: "sm", sm: "md" }}
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
                            ? ` ${minPlaytime}`
                            : ` ${minPlaytime} - ${maxPlaytime}`}
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
                            {/* tooltip and iconbutton potentially here */}
                          </Flex>
                        )}
                      </Stack>
                    </Skeleton>
                    {/* {isBigScreen && (
  <Tooltip
    hasArrow
    label={
      isItemOnWishlist
        ? "This game is already on your wishlist!"
        : "Add game to wishlist (See it in the Player section)"
    }
    bg={customTheme.colors.darkBrown}
  >
    <IconButton
      color={customTheme.colors.lightBrown}
      isRound
      icon={isItemOnWishlist ? <CheckIcon /> : <AddIcon />}
      size="sm"
      right="5"
      bottom="5"
      position="absolute"
      onClick={() => onWishlistAdd(currentGame["@_id"])}
    />
  </Tooltip>
)} */}
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

    if (isLoading) {
      return (
        <Card direction={{ sm: "column", xl: "row" }} variant="outline" mt="20">
          <Center>
            <Spinner size="xl" />
          </Center>
        </Card>
      );
    }
  };

  return <>{content()}</>;
}

export default GameInfoCard;
