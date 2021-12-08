import { create_error_message } from "../InputChek";

const TEST = [
  {
    label: "it should return a string",
    input: [{ field: "frequency", code: "empty" }],
  },
];

describe("Write error array into readable string", () => {
  for (const test of TEST) {
    it(test.label, () => {
      const result = create_error_message(test.input);
      console.log(result)
    });
  }
});
