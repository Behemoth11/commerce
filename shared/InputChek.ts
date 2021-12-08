import DICTIONARY from "./DICTIONNARY";
import { isEmpty } from "./shared_functions";

type error = { field: string; code: string };
type verifier = {
  [key: string]: string| boolean |string[] | ((field_value: any) => true | string);
};

export class Verifier {
  private verifiers: verifier;
  private require_stack: {};

  constructor(verifier?: verifier, require_stack?: {}) {
    this.verifiers = verifier;
    this.require_stack = require_stack;
  }

  private static getRelevantField = (input, require_stack) => {
    if (Array.isArray(require_stack)) return require_stack;

    const importantField = require_stack.requires;

    if (!importantField) return [];

    for (const field of importantField) {
      const fieldValue = input[field];
      const field_require_stack = require_stack[field];

      if (require_stack[field]) {
        const value_require_stack = field_require_stack[fieldValue];

        if (value_require_stack) {
          importantField.push(
            ...Verifier.getRelevantField(input, value_require_stack)
          );
        }
      }
    }

    return importantField;
  };

  public verify: (fieldName: string, value: any) => true | string = (
    fieldName: string,
    value: any
  ) => {
    const verifier = this.verifiers[fieldName];
    if (verifier === undefined) {
      return !isEmpty(value) || "empty";
    } else if (Array.isArray(verifier)) {
      if (isEmpty(value)) return "empty";
      return verifier.includes(value) || "invalid";
    } else if (typeof verifier === "function") {
      return verifier(value);
    } else {
      return verifier === value || "incorrect";
    }
  };

  public validate = (input) => {
    const relevant_input = {};
    const error: error[] = [];

    // console.log(input)

    const relevant_field = Verifier.getRelevantField(input, this.require_stack);

    for (const field of relevant_field) {
      relevant_input[field] = input[field];
      const code = this.verify(field, input[field]);

      if (!(code === true)) {
        error.push({ field, code });
      }
    }

    return { validation: error.length === 0, error, relevant_input };
  };
}

export const formatError = (
  error: error,
  custom_dictionary?: {},
  lang: string = "fr"
) => {
  let field_text = custom_dictionary && custom_dictionary[error.field];
  let code_text = custom_dictionary && custom_dictionary[error.code];

  if (!field_text) {
    field_text = DICTIONARY[error.field];
  }
  if (!code_text) {
    code_text = DICTIONARY[error.code];
  }

  return `${field_text ? field_text[lang] : (field_text || error.field)} ${
    code_text && code_text[lang] || error.code
  }`;
};

export const create_error_message = (errors: error[]) => {
  return errors.map((error) => formatError(error));
};
