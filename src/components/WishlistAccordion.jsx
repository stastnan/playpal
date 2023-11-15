import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import Wishlist from "./Wishlist";
import { customTheme } from "src/main";

function WishlistAccordion({
  wishlist,
  parsedHotGames,
  isItemOnWishlist,
  setIsItemOnWishlist,
  setWishlist,
  setIsWishlistVisible,
  isWishlistVisible,
}) {
  return (
    <Accordion allowMultiple pt="5">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              <Heading as="h5" size="sm" py="2">
                Venture into your wishlist realm. Ready for revelation?
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Box
            bg={customTheme.colors.lightYellow}
            borderRadius={10}
            p="5"
            w={{ base: "70%", md: "50%" }}
            mx="auto"
          >
            <Wishlist
              wishlist={wishlist}
              parsedHotGames={parsedHotGames}
              isItemOnWishlist={isItemOnWishlist}
              setIsItemOnWishlist={setIsItemOnWishlist}
              setWishlist={setWishlist}
              setIsWishlistVisible={setIsWishlistVisible}
              isWishlistVisible={isWishlistVisible}
            />
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default WishlistAccordion;
