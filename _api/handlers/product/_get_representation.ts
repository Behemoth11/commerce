import { Types } from "mongoose";
import { string_and_array_to_array } from "../../../shared/UtilityFunctions";
import { Product } from "../../models";
import cloudinary from "../../utils/cloudinary";

const handle_get = async (req, res) => {
  const query = req.query;
  const error = [];
  const ne = query.ne;

  const GlobalQuery = {};

  if (ne) {
    try {
      GlobalQuery["_id"] = { $ne: new Types.ObjectId(ne) };
    } catch (error) {}
  }

  if (query.representation == "all") {
    const products = await Product.find_visible(
      { representation: { $nin: ["none", "hot deals"] }, ...GlobalQuery },
      query.field
    )
      .limit(query.limit)
      .lean()
      .catch((err) => error.push(err.message));

    // console.log("the products to come are ", products);
    return res.json({
      products,
      error,
    });
  }
  const representation = string_and_array_to_array(query.representation) || [];

  const _promises = representation.map(async (rpr) => {
    return await Product.findOne_visible(
      { representation: { $in: rpr?.split(" ") } , ...GlobalQuery},
      query.field
    )
      .lean()
      .catch((err) => error.push(err.message));
  });

  const products = await Promise.all(_promises);
  const finalProducts = [];

  const missingRepresentation = [];

  products.forEach((p, index) => {
    if (!p) missingRepresentation.push(representation[index]);
    else finalProducts.push(p);
  });

  if (missingRepresentation.length > 0) {
    //console.log(missingRepresentation)
    const _newPromises = missingRepresentation.map(async (rpr) => {
      return await Product.findOne_visible(
        { categories: { $all: rpr.split(" ") } , ...GlobalQuery },
        query.field
      ).catch((err) => error.push(err.message));
    });

    let missingProducts = await Promise.all(_newPromises);
    // console.log(missingProducts)
    missingProducts = missingProducts
      //@ts-ignore
      .map((mongoObj, index) => {
        if (!mongoObj) return;
        //@ts-ignore
        return {
          ...mongoObj._doc,
          representation: missingRepresentation[index],
        };
      })
      .filter((e) => e); //filters the product that are not defined;;
    //console.log(missingProducts)
    finalProducts.push(...missingProducts);

    // console.log(missingProducts)
  }

  res.json({
    products: finalProducts,
    error,
  });
};

export default handle_get;
