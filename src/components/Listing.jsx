import { Badge, Box, List, ListItem, Skeleton, Text } from "@chakra-ui/react";
import he from "he";

function Listing({ games, isLoading }) {
  console.log(games);

  return (
    <Box p="4">
      {games?.length > 0 && (
        <List>
          {games?.map((game) =>
            game.name && game.name["@_value"] ? (
              <ListItem key={game["@_id"]} py="1">
                {he.decode(game.name["@_value"])}
              </ListItem>
            ) : (
              ""
            )
          )}
        </List>
      )}
    </Box>
  );
}

export default Listing;
