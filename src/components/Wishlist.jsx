import { SmallCloseIcon } from "@chakra-ui/icons";
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
import { XMLParser } from "fast-xml-parser";
import { useEffect, useState } from "react";
import { customTheme } from "src/main";
import he from "he";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromWishlist } from "src/utils/wishlistSlice";
import { useGetGameByIdQuery } from "src/utils/gamesApi";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  console.log("WL: ", wishlist);
  const handleDeleteFromWishlist = (gameId) => {
    console.log(gameId);
    dispatch(deleteFromWishlist(gameId));
  };

  // const [wishlistDetails, setWishlistDetails] = useState([]);

  // const removeFromWishlist = (itemId) => {
  //   setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== itemId));
  // };

  // const { gameId } = useParams();

  // useEffect(() => {
  //   const fetchWishlistDetails = async () => {
  //     setIsLoading(true);
  //     const detailsPromises = wishlist.map((itemId) =>
  //       fetchSelectedGame(itemId)
  //     );

  //     try {
  //       const wishlistDetailsData = await Promise.all(detailsPromises);
  //       setWishlistDetails(wishlistDetailsData);
  //     } catch (error) {
  //       toast.error("Error fetching wishlist details:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchWishlistDetails();
  // }, [wishlist]);

  // const fetchSelectedGame = async (itemId) => {
  //   try {
  //     const userSelectedGame = await axios.get(
  //       `https://boardgamegeek.com/xmlapi2/thing?id=${itemId}`
  //     );
  //     const data = userSelectedGame.data;
  //     // Parsing data from XML to JS - customized code for reading attributes

  //     const options = {
  //       ignoreAttributes: false,
  //       allowBooleanAttributes: true,
  //     };
  //     const parser = new XMLParser(options);
  //     let parsedData = parser.parse(data);
  //     const userSelectedGameInfo = parsedData?.items?.item;

  //     if (userSelectedGameInfo && userSelectedGameInfo.name[0]) {
  //       const name = userSelectedGameInfo.name[0];
  //       const currentName = he.decode(name["@_value"]);
  //       userSelectedGameInfo.name["@_value"] = currentName;
  //     }

  //     setSelectedGameInfo(userSelectedGameInfo);
  //     console.log(selectedGameInfo);

  //     return { id: itemId, gameName: userSelectedGameInfo.name["@_value"] };
  //   } catch (err) {
  //     console.error(`Failed to load details for game with ID ${itemId}`);
  //     throw err;
  //   }
  // };

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
      {/* <UnorderedList listStyleType="none" w="80%">
        {wishlist.map((gameDetail.id) => (
          <ListItem
            key={gameDetail.id}
            fontSize={{ base: "sm", sm: "md" }}
            py="2"
          >
            <Flex justify="space-between" align="center">
              <Link to={`/games/${gameDetail.id}`}>
                <Text
                  fontSize={{ base: "xs", sm: "sm" }}
                  px="2"
                  noOfLines={1}
                  _hover={{
                    fontWeight: "bold",
                    color: customTheme.colors.darkBrown,
                  }}
                >
                  {gameDetail.gameName}
                </Text>
              </Link>
              <Tooltip
                color="white"
                hasArrow
                label="Remove game from wishlist"
                bg={customTheme.colors.darkBrown}
              >
                <IconButton
                  isRound
                  variant="ghost"
                  icon={<SmallCloseIcon />}
                  onClick={() => handleDeleteFromWishlist(gameDetail.id)}
                  size={{ base: "xs", md: "sm" }}
                />
              </Tooltip>
            </Flex>
          </ListItem>
        ))} */}
      {/* </UnorderedList> */}
    </Flex>
  );
}
// const GameItem = () => {
//   co;
//   const { data, isLoading, isSuccess, isError, error } =
//     useGetGameByIdQuery(gameId);

//   if (isLoading) {
//     // Loading indicator
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     console.error("Error fetching data:", error);
//     return <div>Error fetching data</div>;
//   }

//   if (isSuccess) {
//     console.log("Data fetched successfully:", data);
//     return <div>{/* Render your component using the data */}</div>;
//   }

//   return null;
// };

export default Wishlist;
