import DICTIONARY from "../DICTIONNARY";
import { CheckGroupInput } from "../InputChek";

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainObject({}): R;
    }
  }
}

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)])
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      };
    }
  },
});

const TEST = [
  {
    label: "should fail if post_type is omitted",
    input: {
      message: "First test for the input",
      post_name: "This post is the very first post int eh story",
    },
    output: {
      error: [{ field: "post_type", code: "empty" }],
      validation: false,
    },
  },
  {
    label:
      "test should fail if post_type == scheduled_post && post_date is undefined",
    input: {
      message: "random string",
      post_name: "random string",
      post_type: "scheduled_post",
    },
    output: {
      error: [{ field: "post_date", code: "empty" }],
      validation: false,
    },
  },
  {
    label:
      "validation should fail if post_type === repetitive && frequency is undefined",
    input: {
      message: "random string",
      post_name: "random string",
      post_type: "repetitive_post",
    },
    output: {
      error: [{ field: "frequency", code: "empty" }],
      validation: false,
    },
  },

  {
    label: "validation should succeed",
    input: {
      message: "random string",
      post_name: "random string",
      post_type: "repetitive_post",
      frequency: "weekly",
      selected_days: ["lundi", "mardi"],
    },
    output: {
      error: [],
      validation: true,
    },
  },
];

describe("Test Group Input checker", () => {
  for (const test of TEST) {
    it(test.label, () => {
      // const test = TEST[0];
      const lang = "fr";
      const require_stack = {
        requires: ["post_name", "message", "post_type"],
        post_type: {
          scheduled_post: {
            requires: ["post_date"],
          },
          repetitive_post: {
            requires: ["frequency"],
            frequency: {
              weekly: {
                requires: ["selected_days"],
              },
              monthly: {
                requires: ["selected_monthly"],
              },
              custom: {
                requires: ["custom_frequency", "next_date"],
              },
            },
          },
        },
      };
      const result = CheckGroupInput(test.input, require_stack);
      console.log(test.input, result);

      expect(result.validation).toBe(test.output.validation);

      for (const err of test.output.error) {
        // console.log(err)
        expect(result.error).toContainObject(err);
      }
    });
  }
});
