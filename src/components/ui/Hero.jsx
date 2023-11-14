import { Box, Image, useBreakpointValue } from "@chakra-ui/react";

import bannerSM from "src/assets/images/banner-sm.png";
import bannerMD from "src/assets/images/banner-md.png";
import bannerLG from "src/assets/images/banner-lg.png";
import bannerXL from "src/assets/images/banner-xl.png";
import bannerXXL from "src/assets/images/banner-2xl.png";
import bannerXXXL from "src/assets/images/banner-3xl.png";

function Hero() {
  const imageSource = useBreakpointValue(
    {
      base: bannerSM,
      sm: bannerMD,
      md: bannerLG,
      lg: bannerXL,
      xl: bannerXXL,
      "2xl": bannerXXXL,
    },
    {
      fallback: "lg",
    }
  );

  return (
    <Box maxW="2048px" w="100%">
      <Image
        src={imageSource}
        maxH="80vh"
        w="100%"
        alt="title image of the website - boardgames library"
      />
    </Box>
  );
}

export default Hero;
