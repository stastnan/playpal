import he from "he";

const findDescription = (gameAttributes) => {
  let description = null;

  for (const att of gameAttributes) {
    if (
      att.name === "description" &&
      att.attributes &&
      att.attributes.value !== undefined
    ) {
      description = att.attributes.value;
    }

    if (
      att.name === "description" &&
      att.value !== undefined &&
      att.value.trim() !== ""
    ) {
      description = att.value.trim();
      description = he
        .decode(description)
        .replace(/&#10;/g, "\n")
        .replace(/&mdash;/g, " - ")
        .replace(/&rsquo;/g, "'")
        .replace("- description from the publisher", "")
        .replace(/&quot;/g, `"`);
    }
  }

  return description;
};

const useFindDescription = (gameData) => {
  if (!gameData || !gameData[0] || !gameData[0].children) {
    return null;
  }

  return findDescription(gameData[0].children);
};

export default useFindDescription;
