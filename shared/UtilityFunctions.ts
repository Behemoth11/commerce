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

export const formatUrl = (array) => {
  return array.map((item) =>
    item ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/${item}` : ""
  );
};
