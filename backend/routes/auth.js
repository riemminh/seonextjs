const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  singout,
  requireSingin
} = require("../controllers/auth");

// validators
const { runValidation } = require("../validators/index");
const {
  userSignupValidator,
  userSigninValidator
} = require("../validators/auth");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", singout);

router.get("/secret", requireSingin, (req, res) => {
  res.json({
    message: "success get secret"
  });
});

module.exports = router;
