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
      break;
    }

    if (att.children && att.children.length > 0) {
      const descriptionFromChild = findDescription(att.children);

      if (descriptionFromChild) {
        description = descriptionFromChild;
        break;
      }
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
        .replace("- description from the publisher", "");
      break; // Stop searching once the description is found
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
