const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Ejemplo de fetch de todos los posts
router.post("/", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user[0].username != null) {
      res.json(user[0]);
      console.log(req.body);
      console.log("Exito");
      console.log(user);
    } else {
      return res.status(400).send({
        message: "This is an error!"
      });
    }
  } catch (error) {
    res.status(400);
    console.log("Error");
  }
});

//Ejemplo de mandar un post
router.post("/newUser", async (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
