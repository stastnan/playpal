import { Badge, Box, List, ListItem, Skeleton, Text } from "@chakra-ui/react";

function Listing({ games, isLoading }) {
  console.log(games);

  return (
    <Box p="4">
      {games?.length > 0 && (
        <List>
          {games?.map((game) =>
            // here has to be check for type, otherwise it returns also video games and rpg, that collide with boardgames ids
            game["@_type"] === "boardgame" &&
            game.name &&
            game.name["@_value"] ? (
              <ListItem key={game["@_id"]} py="1">
                {game.name["@_value"]}
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
