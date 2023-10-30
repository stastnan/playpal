import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";

function GameSwiperImage({ picture, handleCardClick, id }) {
  const imageSize = useBreakpointValue(
    {
      base: 70,
      sm: 90,
      md: 100,
      lg: 110,
      xl: 120,
      "2xl": 120,
    },
    {
      fallback: "lg",
    }
  );

  return (
    <Box w={imageSize} h={imageSize}>
      <Image
        src={picture}
        w="100%"
        h="100%"
        objectFit="fill"
        borderRadius="5%"
        cursor="pointer"
        overflow="hidden"
        onClick={() => handleCardClick(id)}
      />
    </Box>
  );
}

export default GameSwiperImage;
