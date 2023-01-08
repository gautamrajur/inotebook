const express = require('express');
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');


//Create a User using : POST "/api/auth". No login required
router.post('/',[  
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password','Password needs to be atleast 5 characters').isLength({ min: 5 }),
    body('name','Enter a name with atleast 3 characters').isLength({ min: 3 })], (req, res)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
          return res.status(400).json({ errors: errors.array() });

          User.create({
            name : req.body.name,
            password : req.body.password,
            email : req.body.email
        }).then(user => res.json(user)).catch(err => {console.log(err)
        res.json('Enter a unique email value')});
        
})
  

module.exports = router