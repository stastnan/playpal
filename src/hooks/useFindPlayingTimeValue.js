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

    if (att.children && att.children.length > 0) {
      const timeData = findPlaytimeValue(att.children);

      if (timeData) {
        minPlaytime = minPlaytime || timeData.minPlaytime;
        maxPlaytime = maxPlaytime || timeData.maxPlaytime;
      }
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
