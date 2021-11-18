import { Product } from "../../models";

const search = async (text, filters, options) => {
  const project = {
    $project: {
      _id: 1,
      score: {
        $meta: "searchScore",
      },
    },
  };
  if (options.field) {
    options.field.forEach((field) => (project.$project[field] = 1));
  }

  console.log(filters, "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  const products = await Product.aggregate([
    {
      $search: {
        text: {
          query: text,
          path: {
            wildcard: "*",
          },
            fuzzy: {
              maxEdits: 2,
            },
        },
      },
    },
    { $match: filters },
    project,
    { $limit: options.limit + 1 },
    { $skip: options.limit * options.page },
  ]).catch((err) => console.error(err));
  //@ts-ignore
  const more = products.length > options.limit;

  return {
    products: products || [],
    more,
  };
};

export default search;
