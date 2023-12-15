const findMinAge = (gameAttributes) => {
  let minAge = null;

  for (const att of gameAttributes) {
    if (att.name === "minage" && att.attributes && att.attributes.value) {
      minAge = att.attributes.value;
    }
  }

  return minAge;
};

const useFindMinAge = (gameData) => {
  if (!gameData || !gameData[0] || !gameData[0].children) {
    return null;
  }

  return findMinAge(gameData[0].children);
};

export default useFindMinAge;
