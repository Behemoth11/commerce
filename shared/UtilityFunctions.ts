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
