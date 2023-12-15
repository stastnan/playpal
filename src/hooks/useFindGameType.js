const findGameType = (gameAttributes) => {
  let gameType = null;

  for (const att of gameAttributes) {
    if (att.attributes === "type") {
      gameType = att.attributes.type;
    }
  }

  return gameType;
};

const useFindGameType = (gameData) => {
  if (!gameData || !gameData[0] || !gameData[0].children) {
    return null;
  }

  return findGameType(gameData[0].children);
};

export default useFindGameType;
