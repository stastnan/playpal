import { XMLParser } from "fast-xml-parser";
import he from "he";

const parserOptions = {
  ignoreAttributes: false,
  allowBooleanAttributes: true,
};

export const transferXmlToJsSimple = (response) => {
  console.log(response);

  const parser = new XMLParser(parserOptions);
  const parsedResponse = parser.parse(response.items);

  const data = parsedResponse?.items;
  return data;
};

export const transferXmlToJsWithDetails = (response) => {
  const parser = new XMLParser(parserOptions);
  const parsedResponse = parser.parse(response.items);
  const data = parsedResponse?.items?.item;

  // decoding HTML entities for two scenarios - some games come from API with only one name, some with an array of names
  if (data && data.name[0]) {
    const name = data.name[0];
    const currentName = he.decode(name["@_value"]);
    data.name["@_value"] = currentName;
  }

  if (data && data.description) {
    data.description = he.decode(data.description);
  }

  return data;
};
