const express = require("express");
const router = express.Router();

const { SignUp, SignIn, get_User, update_User, delete_User } = require("../controllers/user");
const isAuth = require("../middlewares/auth_jwt");
const { registerValidation, validation, signinValidation } = require("../middlewares/user");

router.post("/signup", registerValidation(), validation, SignUp);

router.post("/signin", signinValidation(), validation, SignIn);

router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});

router.get("/", isAuth, get_User);//contact/:id

router.put("/", isAuth, update_User);//:id

router.delete("/", isAuth, delete_User);//:id

module.exports = router;
