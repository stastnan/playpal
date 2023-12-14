const findMinAge = (gameAttributes) => {
  let minAge = null;

  for (const att of gameAttributes) {
    if (att.name === "minage" && att.attributes && att.attributes.value) {
      minAge = att.attributes.value;
      break;
    }

    if (att.children && att.children.length > 0) {
      const minAgeFromChild = findMinAge(att.children);

      if (minAgeFromChild) {
        minAge = minAgeFromChild;
        break;
      }
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
