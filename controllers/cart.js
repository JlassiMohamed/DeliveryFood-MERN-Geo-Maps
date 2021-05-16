const Cart = require("../models/Cart");

exports.getUserCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    // console.log(cart);
    return res.status(201).send({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errors: [{ msg: `server error, ${error}` }] });
  }
};

exports.deleteItemCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    let result = await cart.products.filter(
      (p) => p.productId !== req.params.productId
    );
    cart.products = result;
    cart = await cart.save();
    return res.status(201).send({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errors: [{ msg: `server error, ${error}` }] });
  }
};

exports.addItemToCart = async (req, res) => {
  const { productId, quantity, name, price, imageUrl, restaurantId } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.active = true;
        cart.products.push({ productId, quantity, name, price, imageUrl, restaurantId });
      }
      cart = await cart.save();
      console.log(cart);
      return res.status(201).send({ cart });
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId: req.user._id,
        products: [{ productId, quantity, name, price, imageUrl, restaurantId }],
      });
      console.log(newCart);
      return res.status(201).send({ cart: newCart });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ errors: [{ msg: `Something went wrong, ${error}` }] });
  }
};

exports.deleteCart = async (req, res) => {
  // let userId = req.params.id;
  let cartId = req.user.cart;
  try {
    const result = await Cart.deleteOne({ _id: cartId });
    !result.n
      ? res.status(400).send({ message: `Cart was already deleted` })
      : res.status(200).send({ user: result, message: `Cart deleted` });
  } catch (error) {
    res
      .status(400)
      .send({ message: `there is no cart with this id, ${error}` });
  }
};