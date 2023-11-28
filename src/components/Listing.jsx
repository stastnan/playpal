import { Badge, Box, List, ListItem, Skeleton, Text } from "@chakra-ui/react";
import he from "he";
import { Link, useParams } from "react-router-dom";

function Listing({ games, isLoading }) {
  const { gameId } = useParams();
  console.log(games);

  return (
    <Box p="4">
      {games?.length > 0 && (
        <List>
          {games?.map((game) =>
            game.name && game.name["@_value"] ? (
              <ListItem key={game["@_id"]} py="1">
                <Link to={`/games/${game["@_id"]}`}>
                  {he.decode(game.name["@_value"])}
                </Link>
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
