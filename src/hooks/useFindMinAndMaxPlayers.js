const findMinAndMaxPlayers = (gameAttributes) => {
  let minPlayers = null;
  let maxPlayers = null;

  for (const att of gameAttributes) {
    if (att.name === "minplayers" && att.attributes && att.attributes.value) {
      minPlayers = att.attributes.value;
    } else if (
      att.name === "maxplayers" &&
      att.attributes &&
      att.attributes.value
    ) {
      maxPlayers = att.attributes.value;
    }

    if (att.children && att.children.length > 0) {
      const playerRangeFromChild = findMinAndMaxPlayers(att.children);

      if (playerRangeFromChild) {
        minPlayers = minPlayers || playerRangeFromChild.minPlayers;
        maxPlayers = maxPlayers || playerRangeFromChild.maxPlayers;
      }
    }
  }

  return {
    minPlayers,
    maxPlayers,
  };
};

const useFindMinAndMaxPlayers = (gameData) => {
  if (!gameData || !gameData[0] || !gameData[0].children) {
    return {
      minPlayers: null,
      maxPlayers: null,
    };
  }

  return findMinAndMaxPlayers(gameData[0].children);
};

export default useFindMinAndMaxPlayers;
