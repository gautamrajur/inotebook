const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser") ;

const JWT_SECRET = "GautamRaju@1234";

//ROUTE 1 : Create a User using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password needs to be atleast 5 characters").isLength({
      min: 5,
    }),
    body("name", "Enter a name with atleast 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If there are errors in the request, return Bad request and the errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      //Check if user exists in database
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(400)
          .json({ error: "Sorry a User wiht the email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      //Create a new user if user already doens't exist
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);

      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

//Authenticate a User using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    // password is a mandatory field
    body("password", "Mandatory field").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors in the request, return Bad request and the errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try again with the correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try again with the correct credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

//ROUTE 3 :Get Logged in User Details : POST "/api/auth/getuser".Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
});

module.exports = router;
