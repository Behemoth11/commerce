import {User} from "../../models";

const handle_delete = async (req, res) => {
  const query = req.query;
  // console.log(query)

  const updatedUser = await User.updateOne(
    { _id: req.user._id },
    {
      "$pull": {
        cart: query._id,
      },
    }
    );
    
  // console.log(updatedUser);
  res.status(200).json({ message: "success full update" });
};

export default handle_delete;
