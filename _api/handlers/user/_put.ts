import { User } from "../../models";

const handle_put = async (req, res) => {
  const query = req.query;
  const body = req.body;

  if (query.field == "cart") {
    const updatedUser = await User.updateOne(
      { _id: req.user._id, cart: { $ne: req.body._id } },
      {
        $addToSet: {
          cart: body._id,
        },
      }
    );

    if (updatedUser.modifiedCount >= 1) {
      res.status(200).json({ message: "success full update" });
    } else {
      res.status(501).json({
        message: "Item already exists",
      });
    }
  } else {
    const updatedUser = await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          firstName: body.firstName,
          username: body.username,
          lastName: body.lastName,
          contact: {
            phoneNumber: body.phoneNumber,
            email: body.email,
          },
        },
      }
    );

    if (updatedUser.modifiedCount >= 1) {
      res.status(200).json({ message: "success full update" });
    } else {
      res.status(501).json({
        message: "Item already exists",
      });
    }
  }
};

export default handle_put;
