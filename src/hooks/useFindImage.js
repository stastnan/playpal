const findImage = (gameAttributes) => {
  let image = null;

  for (const attribute of gameAttributes) {
    if (attribute.name === "image" && attribute.value) {
      image = attribute.value;
    }
  }

  return image;
};

const useFindImage = (gameData) => {
  if (!gameData || !gameData[0] || !gameData[0].children) {
    return null;
  }

  const image = findImage(gameData[0].children);

  return image;
};

export default useFindImage;
