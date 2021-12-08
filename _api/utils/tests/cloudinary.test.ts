import { eraseImages, uploadMany } from "./../cloudinary";

const TEST_IMAGE = [
  "https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940",
];

describe("Testing cloudinary testing function", () => {
  let public_ids = [];

  it("should upload to cloudinary and return ids", async () => {
    const error = [];
    const not_uploaded = {};
    const result = await uploadMany(TEST_IMAGE, error, not_uploaded);

    public_ids = public_ids.concat(result);

    expect(public_ids.every((id) => /KdShop/.test(id))).toBe(true);
  });

  it("should delete new items", async () => {
    const result = await eraseImages(["KdShop/1638064075387"], []);

    console.log(result)

    for (const res of result) {
      expect(res.result).toBe("ok");
    }
  });
});
