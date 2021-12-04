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
  femme: {
    title: "femme",
    content: ["pagne", "robe", "jupe", "bijoux"],
    bijou: {
      title: "bijoux",
      content: ["bracelet", "chainette"],
    },
  },
  homme: {
    title: "homme",
    content: [
      "veste",
      "pagne",
      "pantalons",
      "chemise",
      "chapeau",
      "chaussures",
    ],
  },
  enfant: {
    title: "enfant",
    content: ["sac", "chemise", "pantalons", "t-shirts"],
  },
  ustensils: {
    title: "ustensils",
    content: ["cuisine"],
  },
};

// utilities: {
//   title: "ustensils",
//   content: ["pot", "plates", "ustensils"],
//   ustensils: {
//     title: "ustensils",
//     content: ["spoons", "fork", "knifes"],
//   },
// },
// };
export const ITEM_NATURE = getCategories(categories, ["femme", "homme", "enfant", "ustensils"]);

export const navBarSections = {
  menu: {
    ...categories,
    title: "menu",
    content: ["femme", "homme", "enfant", "ustensils", "tous"],
    tous: {
      title: "tous les articles",
      content: ITEM_NATURE,
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

export const getRelated = (_categories, raw ?: boolean) => {
  let navigationQuery;

  if (_categories == "tous")
    navigationQuery = [" femme", " homme", " enfant", " bijoux", " ustensils"];
  else
    navigationQuery = REPRESENTATIONS.filter((representation) => {
      return string_and_array_to_array(_categories)?.some((categorie) => {
        return new RegExp(categorie, "i").test(representation);
      });
    });

  if (raw){
    return navigationQuery.map(query => query.slice(1));
  }
  
  return navigationQuery.map((e) => `representation=${e.slice(1)}`).join("&"); //we slice here because there is a space at the beginning of the string
};
