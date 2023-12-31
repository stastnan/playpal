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

function WishlistAccordion() {
  return (
    <Accordion allowMultiple pt="5">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              <Heading
                as="h5"
                size={{ base: "xs", sm: "sm" }}
                py="2"
                px="5"
                color={customTheme.colors.lightYellow}
              >
                Venture into your wishlist realm. Ready for revelation?
              </Heading>
            </Box>
            <AccordionIcon color={customTheme.colors.lightYellow} />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Box
            bg={customTheme.colors.lightYellow}
            borderRadius={10}
            p="5"
            w={{ base: "90%", md: "50%" }}
            mx="auto"
          >
            <Wishlist />
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default WishlistAccordion;
