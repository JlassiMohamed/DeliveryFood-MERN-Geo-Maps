const User = require("../models/User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");

exports.SignUp = async (req, res) => {
  try {
    //   req.body
    const { name, lastName, email, phone, password } = req.body;

    // check if the email is not found in the database
    const FoundUser = await User.findOne({ email });

    if (FoundUser) {
      res.status(400).send({
        errors: [{ msg: "user already exist email should be unique" }],
      });
      return;
    }
    const newUser = new User({ ...req.body });

    // hash the password
    const hashedpassword = bcrypt.hashSync(password, salt);
    newUser.password = hashedpassword;

    // create a key using json webtoken
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 60 }
    );
    //then we save it in the database
    const user = await newUser.save();

    if (user.role === "user") {
      let newCart = await Cart.create({
        userId: user._id,
        products: [],
      });
      await user.updateOne({ $set: { cart: newCart._id } });
    }

    res.status(200).send({ msg: "user saved succ", user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not save the user" }] });
  }
};

exports.SignIn = async (req, res) => {
  try {
    // get the req.body
    const { email, password } = req.body;
    // seach if the user exist
    const searchUser = await User.findOne({ email }).populate("restaurant");
    console.log(searchUser);
    // send an error if he didnt exist
    if (!searchUser) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // check if the send it password is equal to the current Password
    const hashedpass = searchUser.password;
    const result = await bcrypt.compare(password, hashedpass); // true or false
    if (!result) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // else create a key
    const token = jwt.sign(
      {
        id: searchUser._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 60 }
    );

    // send the details + a key
    res.status(200).send({ msg: "auth success", user: searchUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not get the currentUser" }] });
  }
};

exports.get_User = async (req, res) => {
  try {
    let userId = req.user._id;
    const result = await User.findOne({ _id: userId });
    console.log(result);
    res.status(200).send({ user: result, message: `getting user contact` });
  } catch (error) {
    res
      .status(400)
      .send({ message: `there is no user contact with this id, ${error}` });
  }
};

exports.update_User = async (req, res) => {
  try {
    let userId = req.user._id;
    const result = await User.updateOne(
      { _id: userId },
      { $set: { ...req.body } }
    );
    console.log(result);
    result.nModified
      ? res.status(200).send({ user: result, message: `user contact updated` })
      : res.status(400).send({ message: "user contact is already updated" });
  } catch (error) {
    res
      .status(400)
      .send({ message: `there is no user contact with this id, ${error}` });
  }
};

exports.delete_User = async (req, res) => {
  let userId = req.user._id;
  try {
    const result = await User.deleteOne({ _id: userId });

    !result.n
      ? res.status(400).send({ message: `user contact was already deleted` })
      : res.status(200).send({ user: result, message: `user contact deleted` });
  } catch (error) {
    res
      .status(400)
      .send({ message: `there is no user contact with this id, ${error}` });
  }
};
