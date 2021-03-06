import {User} from "../../models";

const handle_get = async (req, res) => {
  //console.log(" I could reach here")
  const query = req.query;
  const user_id = query.user_id;

  if (user_id) {
    // @ts-ignore
    const { username, firstName, lastName, contact } = await User.findById({
      _id: req.user._id,
    });
    return res.json({
      userData: {
        username,
        lastName,
        firstName,
        contact,
      },
    });
  }

  if (!req.user)
    return res.status(501).json({
      message: "not enough power",
    });
    
  try {
    // @ts-ignore
    const { username, firstName, _id, lastName, cart, role, contact } =
      await User.findById({
        _id: req.user._id,
      });

    res.json({
      userData: {
        firstName,
        username,
        lastName,
        contact,
        role,
        cart,
        _id,
      },
    });
  } catch (err) {
    res.status(501).json({ message: "something went wrong" });
  }
};

export default handle_get;
