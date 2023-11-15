import { CloseIcon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
} from "@chakra-ui/react";
import { customTheme } from "src/main";

function Wishlist({ wishlist, parsedHotGames, setWishlist }) {
  const removeFromWishlist = (itemId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== itemId));
  };

  return (
    <Flex
      justify="center"
      align="center"
      textAlign="center"
      direction="column"
      position="relative"
    >
      <Heading
        as="h4"
        color={customTheme.colors.darkBrown}
        size={{ base: "sm", sm: "md", lg: "lg" }}
      >
        Wishlist
      </Heading>
      <Divider mb="2" />
      <Divider />
      <UnorderedList listStyleType="none" w="80%">
        {wishlist?.map((itemId) => {
          const game = parsedHotGames.find((game) => game["@_id"] === itemId);

          if (game) {
            const gameName = game.name["@_value"];
            return (
              <>
                <ListItem
                  key={itemId}
                  fontSize={{ base: "sm", sm: "md" }}
                  py="2"
                >
                  <Flex justify="space-between" align="center">
                    <Text
                      fontSize={{ base: "xs", sm: "sm" }}
                      px="2"
                      noOfLines={1}
                    >
                      {gameName}
                    </Text>
                    <Tooltip
                      color="white"
                      hasArrow
                      label="Remove game from wishlist"
                      bg={customTheme.colors.darkBrown}
                    >
                      <IconButton
                        isRound={true}
                        variant="ghost"
                        colorScheme="gray"
                        fontSize="10px"
                        icon={<CloseIcon />}
                        onClick={() => removeFromWishlist(itemId)}
                        size="xs"
                      />
                    </Tooltip>
                  </Flex>
                </ListItem>
                <Divider />
              </>
            );
          }

          return null;
        })}
      </UnorderedList>
    </Flex>
  );
}

export default Wishlist;
