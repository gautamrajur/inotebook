const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET = "GautamRaju@1234";

//Create a User using : POST "/api/auth". No login required
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
      const secPassword = await bcrypt.hash(req.body.password, salt)

      //Create a new user if user already doens't exist 
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
     
     const data = {
      user : {
        id : user.id
      }
     } 
     const authtoken = jwt.sign(data,JWT_SECRET);
     console.log(authtoken);

     res.json({authtoken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
