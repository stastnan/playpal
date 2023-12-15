import PropTypes from "prop-types";
import {
  Table,
  Tr,
  Td,
  TableContainer,
  Tbody,
  Center,
  Spinner,
} from "@chakra-ui/react";

import { useGetGameByIdQuery } from "src/utils/gamesApi";
import useFindMinAge from "src/hooks/useFindMinAge";
import useFindPlayingTimeValue from "src/hooks/useFindPlayingTimeValue";
import useFindMinAndMaxPlayers from "src/hooks/useFindMinAndMaxPlayers";
import useFindGameType from "src/hooks/useFindGameType";
import { customTheme } from "src/main";

function GameInfoTable({ selectedGameId }) {
  const { data, isError, error, isLoading, isSuccess } =
    useGetGameByIdQuery(selectedGameId);

  const { minPlaytime, maxPlaytime } = useFindPlayingTimeValue(data);
  const { minPlayers, maxPlayers } = useFindMinAndMaxPlayers(data);
  const minAge = useFindMinAge(data);
  const gameType = useFindGameType(data);

  return (
    <>
      {isLoading && (
        <Center>
          <Spinner color={customTheme.colors.darkBrown} />
        </Center>
      )}
      {isSuccess && (
        <TableContainer py="5">
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Players</Td>

                <Td isNumeric>
                  {minPlayers === maxPlayers
                    ? ` ${minPlayers}`
                    : `
                        ${minPlayers} - ${maxPlayers}`}
                </Td>
              </Tr>
              <Tr>
                <Td>Playing time</Td>

                <Td isNumeric>
                  {minPlaytime === maxPlaytime
                    ? ` ${minPlaytime} min`
                    : ` ${minPlaytime} - ${maxPlaytime} min`}
                </Td>
              </Tr>
              <Tr>
                <Td>Min. age</Td>

                <Td isNumeric>{minAge}</Td>
              </Tr>

              <Tr>
                <Td>Type</Td>

                <Td isNumeric>
                  {gameType === "boardgame" ? "base game" : "expansion"}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {isError && <Center>{error.error ?? "Something went wrong"}</Center>}
    </>
  );
}

GameInfoTable.propTypes = {
  selectedGameId: PropTypes.string,
};

export default GameInfoTable;
