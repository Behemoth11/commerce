import User from "../../models/user";

const handle_put = async (req, res) => {
  const query = req.query;
  const body = req.body;
  const updatedUser = await User.updateOne(
    { _id: req.user._id, cart: { $ne: req.body._id } },
    {
      $addToSet: {
        cart: body._id,
      },
    }
  );

  console.log(updatedUser);
  res.status(200).json({ message: "success full update" });
};

export default handle_put;
