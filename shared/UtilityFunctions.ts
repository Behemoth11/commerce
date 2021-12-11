import { ModuleResolutionKind } from "typescript";

export const setProperty = (
  object: React.MutableRefObject<HTMLDivElement>,
  property: string,
  value
) => {
  object.current.style.setProperty(property, value);
};

export const getRandomInteger = (
  upperBound: number,
  lowerBound: number = 0
) => {
  return Math.floor(Math.random() * (upperBound - lowerBound) + lowerBound);
};

export const string_and_array_to_array: (array: string[] | string) => string[] =
  (array) => {
    // return Array.isArray(array) ? array : array ? [array] : array;
    return Array.isArray(array) ? array : [array];
  };

export const formatPrice = (price: string) => {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CFA",
  }).format(parseFloat(price));
};

export const checkForm = (formData, nonRequired, errors) => {
  const keys = Object.keys(formData);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (nonRequired[key] || formData[key] ) continue;

    if (Array.isArray(formData[key])) {
      let errorOnKey = 0;
      formData[key].forEach((element) => {
        if (element?.length <= 0 && errorOnKey == 0) {
          errorOnKey = 1;
          errors.push(`${key} should be entirely field`);
        }
      });
    } 

    if (!formData[key]) errors.push(`${key} should be field`);
  }
}

export const limitStringTo = (max_length: number, string: string,) => {
  if (!string) return;
  const finalString = string.slice(0, max_length-2);
  if (finalString.length < string.length){
    return finalString+"...";
  }else{
    return string;
  }

}
export const formatUrls = (urls: []) => {
  return urls.map((item) =>
    item
      ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/${item}`
      : ""
  );
};

export const formatUrl = (url: string) => {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/${url}`;
};

export const adapt = (link: string, width: number, aspect_ratio: number) =>
`https://res.cloudinary.com/${
  process.env.NEXT_PUBLIC_CLOUDINARY_NAME
}/image/upload/ar_${
  Math.round(10000 / aspect_ratio) / 100
},c_crop/c_scale,w_${width}/${link}.jpg`;
