import { Card } from "@chakra-ui/react";

function GameInfoCard() {
  return (
    <Card
      direction={{ sm: "column", xl: "row" }}
      overflow="hidden"
      variant="outline"
      mt={20}
      bgColor="#FFFFEF"
      border="none"
    ></Card>
  );
}

export default GameInfoCard;
