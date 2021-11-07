import { string_and_array_to_array } from "../../../shared/UtilityFunctions";

export const getCategories = (object, keys) => {
  const result = [];
  if (!object) return [];
  if (!keys) return [];

  for (let i = 0; i < keys.length; i++) {
    const newObj = object[keys[i]];
    const content = newObj && newObj.content;
    if (content) {
      result.push(...content, ...getCategories(newObj, content));
    }
  }

  const tracker = {};
  for (let i = 0; i < result.length; i++) {
    tracker[result[i]] = "";
  }
  return Object.keys(tracker).sort();
};

export const categories = {
  women: {
    title: "women",
    content: ["bags", "watches", "jewelries", "shoes"],
  },
  men: {
    title: "men",
    content: ["suit", "pant", "short", "cap", "shoes"],
  },
  kids: {
    title: "kids",
    content: ["short", "underwear", "children", "leverages"],
  },
  utilities: {
    title: "utilities",
    content: ["pot", "plates", "ustensils"],
    ustensils: {
      title: "ustensils",
      content: ["spoons", "fork", "knifes"],
    },
  },
};

export const navBarSections = {
  menu: {
    ...categories,
    title: "menu",
    content: ["women", "men", "kids", "utilities", "all"],
    all: {
      title: "all products",
      content: getCategories(categories, ["women", "men", "kids", "utilities"]),
    },
  },
};

export const getRepresentations = (object, keys: string[], trail = "") => {
  const result = [];
  if (!object) return [];
  if (!keys) return [];

  for (let i = 0; i < keys.length; i++) {
    const newObj = object[keys[i]];
    const content = newObj && newObj.content;

    if (content) {
      result.push(
        ...content?.map((categories) => `${trail} ${keys[i]} ${categories}`),
        ...getRepresentations(newObj, content, `${trail} ${keys[i]}`)
      );
    }
  }
  const tracker = {};
  for (let i = 0; i < result.length; i++) {
    tracker[result[i]] = "";
  }
  return Object.keys(tracker).sort();
};

export const REPRESENTATIONS = getRepresentations(
  navBarSections.menu,
  Object.keys(navBarSections.menu)
);

export const getRelated = (_categories) => {
  let navigationQuery;

  if (_categories=="all") navigationQuery = [" women", " men", " kids", " utilities"," posts"," cars"," and"," laptop"];
    
  else  navigationQuery = REPRESENTATIONS.filter((representation) => {
    return string_and_array_to_array(_categories)?.some((categorie) => {
      return new RegExp(categorie, "i").test(representation);
    });
  });

  console.log("the navigation query", navigationQuery)


  return navigationQuery.map((e) => `representation=${e.slice(1)}`).join("&"); //we slice here because there is a space at the beginning of the string
};
