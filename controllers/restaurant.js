const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

// { errors: [{ msg: `` }] }

exports.addRestaurant = async (req, res) => {
  try {
    const newRestaurant = new Restaurant({
      ...req.body,
      seller: req.user._id,
    });

    const emailUsed = await Restaurant.findOne({ email: newRestaurant.email });
    if (emailUsed) {
      res.status(400).send({
        errors: [{ msg: `Restaurant already exists, email should be unique` }],
      });
      return;
    }
    const result = await newRestaurant.save();
    await User.updateOne(
      { _id: req.user._id },
      { $set: { restaurant: newRestaurant._id } }
    );

    res.status(200).send({ msg: `Restaurant created`, restaurant: result });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: `can not save it ${error}` }] });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const result = await Restaurant.find()
      .populate("seller")
      .populate("items");
    res.status(200).send({ msg: `getting all restaurants`, restaurants: result });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: `can not access data ${error}` }] });
  }
};

exports.getRestaurant = async (req, res) => {
  try {
    const result = await Restaurant.findOne({ _id: req.params.id })
      .populate("seller")
      .populate("items");
    // console.log(result);
    res.status(200).send({ msg: `getting the restaurant`, restaurant: result });
  } catch (error) {
    res.status(400).send({
      errors: [{ msg: `there is no contact with this id, ${error}` }],
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const result = await Restaurant.deleteOne({ _id: req.params.id });
    !result.n
      ? res
          .status(400)
          .send({ errors: [{ msg: `Restaurant was already deleted` }] })
      : res.status(200).send({ msg: `Restaurant deleted`, restaurant: result });
  } catch (error) {
    res
      .status(400)
      .send({
        errors: [{ msg: `there is no restaurant with this id, ${error}` }],
      });
  }
};

exports.editRestaurant = async (req, res) => {
  try {
    const result = await Restaurant.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    res.status(200).send({ msg: `Restaurant updated`, restaurant: result });
  } catch (error) {
    res
      .status(400)
      .send({
        errors: [{ msg: `there is no restaurant with this id, ${error}` }],
      });
  }
};
