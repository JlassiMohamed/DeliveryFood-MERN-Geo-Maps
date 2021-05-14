const Order = require("../models/order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

exports.get_seller_orders = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    let orders = await Order.find();
    let result = [];
    for (const el of orders) {
      if (el.products[0].restaurantId == restaurantId) {
        result.push(el);
      }
    }
    res
      .status(200)
      .send({ msg: `getting unique seller orders`, orders: result });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: `can not access data ${error}` }] });
  }
};

exports.handle_orders_status = async (req, res) => {
  try {
    const { status } = req.body;
    const restaurantId = req.params.restaurantId; //or restaurantId = req.user._id <= isSeller
    let orders = await Order.find();
    let result = [];
    for (const el of orders) {
      if (el.products[0].restaurantId == restaurantId) {
        result.push(el);
      }
    }
    let order = await result.filter((o) => o._id == req.params.orderId)[0];

    if (status === "cancelled") {
      if (order.status === "placed") {
        order.status = status;
        order.active = false;
        order = await order.save();
        res.status(200).send({ msg: `Status order updated`, order });
      } else {
        res
          .status(400)
          .send({ msg: `Sorry! order can not be cancelled`, order });
      }
    } else if (status === "placed") {
      if (order.status === "cancelled") {
        res.status(400).send({ msg: `Sorry! order can not be updated`, order });
      } else {
        res.status(400).send({ msg: `Sorry! order can not be updated`, order });
      }
    } else if (status !== "placed") {
      if (order.status === "cancelled") {
        res.status(400).send({ msg: `Sorry! order can not be updated`, order });
      } else {
        order.status = status;
        order = await order.save();
        res.status(200).send({ msg: `Status order updated`, order });
      }
    }
  } catch (error) {
    res.status(400).send({ errors: [{ msg: `can not access data ${error}` }] });
  }
};

exports.update_my_order_status = async (req, res) => {
  try {
    // const userId = req.user._id;
    const userId = req.params.userId;
    const orderId = req.params.orderId;
    const { status } = req.body;
    let orders = await Order.find({ userId });
    let order = await orders.filter((o) => o._id == orderId)[0];

    if (status === "cancelled") {
      if (order.status === "placed") {
        order.status = status;
        order = await order.save();
        res.status(200).send({ msg: `Status order updated`, order });
      } else {
        res
          .status(400)
          .send({ msg: `Sorry! order can not be cancelled`, order });
      }
    } else if (
      status === "placed" &&
      order.status === "cancelled" &&
      order.active === true
    ) {
      order.status = status;
      order = await order.save();
      res.status(200).send({ msg: `Status order updated`, order });
    } else {
      res.status(400).send({ msg: `Sorry! order can not be updated`, order });
    }
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: `there is no order with this id, ${error}` }] });
  }
};

exports.get_my_orders = async (req, res) => {
  try {
    const userId = req.user._id;
    let orders = await Order.find({ userId });
    res.status(200).send({ msg: `getting my all orders`, orders });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: `can not access data ${error}` }] });
  }
};
// get_order !!!! only user can get it from req.user and not req.params!!!!?????????
exports.get_order = async (req, res) => {
  try {
    const userId = req.user._id;
    let orders = await Order.find({ userId });
    let order = await orders.filter((o) => o._id == req.params.orderId)[0];
    res.status(200).send({ msg: `getting the order`, order });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: `can not access data ${error}` }] });
  }
};

exports.checkout = async (req, res) => {
  try {
    const userId = req.params.userId;
    // const userId = req.user._id;
    // const { source } = req.body;

    let cart = await Cart.findOne({ userId });
    let user = await User.findOne({ _id: userId });
    const name = user.name;
    const mobile = user.phone;
    const address = user.address;

    if (cart && cart.products.length > 0) {
      Array.prototype.groupBy = function (key) {
        return this.reduce(function (r, a, i) {
          if (!i || r[r.length - 1][0][key] !== a[key]) {
            return r.concat([[a]]);
          }
          r[r.length - 1].push(a);
          return r;
        }, []);
      };
      let arr = cart.products.groupBy("restaurantId");

      for (const product of arr) {
        const restaurantId = product[0].restaurantId;
        let restaurant = await Restaurant.findOne({ _id: restaurantId });
        const title = restaurant.name;
        const phone = restaurant.phone;
        const order = await Order.create({
          userId,
          products: product,
          status: "placed",
          user: { name, mobile, address },
          restaurant: { title, phone },
        });
      }

      await Cart.updateOne(
        { _id: cart.id },
        { $set: { active: false, products: [] } }
      );
      return res.status(201).send({ msg: `Orders placed successfully` }); // order can not be dispalyed with res.send, it'is defined just inside for-of
    } else {
      res.status(500).send({ msg: "You do not have items in cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Something went wrong" });
  }
};

exports.removeOrder = async (req, res) => {
  try {
    // const restaurantId = req.params.restaurantId;
    let orders = await Order.find();
    let result = await orders.filter((o) => o._id == req.params.orderId)[0];
    if (result.status === "cancelled" || result.status === "completed") {
      let order = await result.deleteOne({ _id: req.params.orderId });
      res.status(200).send({ msg: `order deleted successfully`, order });
    } else {
      res.status(401).send({ msg: `Sorry! order can not be deleted` });
    }
  } catch (error) {
    res
      .status(404)
      .send({ errors: [{ msg: `there is no order with this id, ${error}` }] });
  }
};

// 401 Unauthorized / 400 Bad Request / 403 Forbidden / 404 Not Found
