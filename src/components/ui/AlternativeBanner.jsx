import { Image, useBreakpointValue } from "@chakra-ui/react";

import alternativeBannerBase from "src/assets/images/alternative-banner/banner-search-sm.jpg";
import alternativeBannerSM from "src/assets/images/alternative-banner/banner-search-md.jpg";
import alternativeBannerMD from "src/assets/images/alternative-banner/banner-search-lg.jpg";
import alternativeBannerLG from "src/assets/images/alternative-banner/banner-search-xl.jpg";
import alternativeBannerXL from "src/assets/images/alternative-banner/banner-search-2xl.jpg";
import alternativeBanner2XL from "src/assets/images/alternative-banner/banner-search-3xl.jpg";

function AlternativeBanner() {
  const imageSource = useBreakpointValue(
    {
      base: alternativeBannerBase,
      sm: alternativeBannerSM,
      md: alternativeBannerMD,
      lg: alternativeBannerLG,
      xl: alternativeBannerXL,
      "2xl": alternativeBanner2XL,
    },
    {
      fallback: "alternativeBannerLG",
    }
  );
  return (
    <Image
      src={imageSource}
      w="100%"
      alt="banner for search and game page - fantasy landscape and shelf with boardgames"
    />
  );
}

export default AlternativeBanner;
