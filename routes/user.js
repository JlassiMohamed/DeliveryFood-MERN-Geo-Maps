const express = require("express");
const router = express.Router();

const {
  SignUp,
  SignIn,
  get_User,
  update_User,
  delete_User,
  reset_PassWord,
} = require("../controllers/user");
const isAuth = require("../middlewares/auth_jwt");
const {
  registerValidation,
  validation,
  signinValidation,
} = require("../middlewares/user");

router.post("/signup", registerValidation(), validation, SignUp);

router.post("/signin", signinValidation(), validation, SignIn);

router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});

router.get("/", isAuth, get_User);

router.put("/reset", isAuth, reset_PassWord);

router.put("/", isAuth, update_User);

router.delete("/", isAuth, delete_User);

module.exports = router;
