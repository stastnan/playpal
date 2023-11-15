import { SearchIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { customTheme } from "src/main";
import Search from "src/pages/Search";

function SearchButton() {
  return (
    <Link to="/search">
      <IconButton
        icon={<SearchIcon />}
        isRound
        variant="ghost"
        size={{ base: "xs", sm: "md" }}
        color={customTheme.colors.lightBrown}
      >
        <Search />
      </IconButton>
    </Link>
  );
}

export default SearchButton;
