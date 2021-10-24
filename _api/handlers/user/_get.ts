import User from "../../models/user";

const handle_get = async (req, res) => {
  //console.log(" I could reach here")
    try {
      // @ts-ignore
    const { username, firstName, _id, lastName, cart, role } =
      await User.findById({
        _id: req.user._id,
      });

    res.json({
      userData: {
        firstName,
        username,
        lastName,
        role,
        cart,
        _id,
      },
    });
  } catch (err) {
    res.json({ message: "something went wrong" });
  }
};

export default handle_get;
