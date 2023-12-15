const findPlaytimeValue = (gameAttributes) => {
  let minPlaytime = null;
  let maxPlaytime = null;

  for (const att of gameAttributes) {
    if (att.name === "minplaytime" && att.attributes && att.attributes.value) {
      minPlaytime = att.attributes.value;
    } else if (
      att.name === "maxplaytime" &&
      att.attributes &&
      att.attributes.value
    ) {
      maxPlaytime = att.attributes.value;
    }
  }

  return {
    minPlaytime,
    maxPlaytime,
  };
};

const useFindPlayingTimeValue = (gameData) => {
  if (!gameData || !gameData[0] || !gameData[0].children) {
    return {
      minPlaytime: null,
      maxPlaytime: null,
    };
  }

  return findPlaytimeValue(gameData[0].children);
};

export default useFindPlayingTimeValue;
