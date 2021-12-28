import { createHref } from "../UtilityFunctions";

const TEST = [
  {
    label: "it should return a string",
    input: "/find?categories=daniel",
    output: "/find?categories=daniel",
  },
  {
    label: "should format with query string",
    input: {
      pathname: "/find",
      query: {
        categories: "daniel",
      },
    },
    output: "/find?categories=daniel",
  },
  {
    label: "should format query array",
    input: {
      pathname: "/find",
      query: {
        categories: ["daniel", "book"],
      },
    },
    output: "/find?categories=daniel&categories=book",
  },
  {
    label: "should format query array (more than one)",
    input: {
      pathname: "/find",
      query: {
        categories: ["daniel", "book"],
        color: ["blue", "yellow"]
      },
    },
    output: "/find?categories=daniel&categories=book&color=blue&color=yellow",
  },
  {
    label: "should format query array (array and string)",
    input: {
      pathname: "/find",
      query: {
        categories: ["daniel", "book"],
        color: "blue"
      },
    },
    output: "/find?categories=daniel&categories=book&color=blue",
  }
];

describe("transform query obj to string", () => {
  for (const test of TEST) {
    it(test.label, () => {
      const result = createHref(test.input);
      console.log(result);
      expect(result).toEqual(test.output);
    });
  }
});
