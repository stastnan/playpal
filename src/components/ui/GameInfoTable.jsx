import { Table, Tr, Th, Td, TableContainer, Tbody } from "@chakra-ui/react";
import { customTheme } from "src/main";

function GameInfoTable({ selectedGameInfo }) {
  return (
    <TableContainer py="5">
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>Players</Td>

            <Td isNumeric>
              {selectedGameInfo?.minplayers["@_value"] ===
              selectedGameInfo?.maxplayers["@_value"]
                ? ` ${selectedGameInfo?.minplayers["@_value"]}`
                : `
                        ${selectedGameInfo?.minplayers["@_value"]} - ${selectedGameInfo?.maxplayers["@_value"]}`}
            </Td>
          </Tr>
          <Tr>
            <Td>Playing time</Td>

            <Td isNumeric>
              {selectedGameInfo?.minplaytime["@_value"] ===
              selectedGameInfo?.maxplaytime["@_value"]
                ? ` ${selectedGameInfo?.minplaytime["@_value"]} min`
                : ` ${selectedGameInfo?.minplaytime["@_value"]} - ${selectedGameInfo?.maxplaytime["@_value"]} min`}
            </Td>
          </Tr>
          <Tr>
            <Td>Min. age</Td>

            <Td isNumeric>{selectedGameInfo?.minage["@_value"]}</Td>
          </Tr>

          <Tr>
            <Td>Type</Td>

            <Td isNumeric>
              {selectedGameInfo?.["@_type"] === "boardgame"
                ? "base game"
                : "expansion"}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default GameInfoTable;
