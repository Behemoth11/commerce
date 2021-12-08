import { v2 as cloudinary } from "cloudinary";
require("dotenv").config()

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const upload = async (image, error) => {

  const productLocation = "KdShop/" + new Date().getTime();

  const _response = await cloudinary.uploader
    .upload(image, { public_id: productLocation })
    .catch((err) => error.push(err));

  return _response;
};

/**********Cloudinary upload**************/

export const uploadMany = async (data, error, not_uploaded) => {
  if (!data) return error.push("The data provided does not contain pictures");
  const _imagePromise = [];

  for (let i = 0; i < data.length; i++) {
    // console.log(data[i], process.env.NEXT_PUBLIC_CLOUDINARY_NAME)
    const isOnMyServer = new RegExp(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`
    ).test(data[i].slice(0, 50));
    if (isOnMyServer) {
      const image_url = data[i].split("image/upload/")[1]
      not_uploaded[image_url] = true;
      _imagePromise[i] = {public_id: image_url};
    } else {
      _imagePromise[i] = await upload(data[i], error).catch((err) =>
        error.push(err)
      );
    }
  }

  const _response = await Promise.all(_imagePromise)

  //@ts-ignore
  return _response.map((element) => element.public_id);
};

export const eraseImages = async (images, error) => {
  // console.log(images)
  const promises = images.map(
    async (image) => await cloudinary.uploader.destroy(image)
  );

  const result = await Promise.all(promises)
  // console.log(result)
  return result;
};
