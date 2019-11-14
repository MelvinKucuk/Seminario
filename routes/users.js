const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Verificar usuario
router.post("/", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user[0].username != null) {
      res.json(user[0]);
      console.log(user[0]);
    } else {
      return res.status(400).send({
        message: "This is an error!"
      });
    }
  } catch (error) {
    return res.status(400).send();
  }
});

// Crear Nuevo Usuario
router.post("/newUser", async (req, res) => {
  console.log(req.body);
  const user = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    fechaNacimiento: req.body.fechaNacimiento,
    pais: req.body.pais,
    domicilio: req.body.domicilio
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
    return res.status(400).send();
  }
});

// Actualizar un usuario
router.patch("/", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { username: req.body.username },
      { $set: { 
        username: req.body.username,
        password: req.body.password,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        fechaNacimiento: req.body.fechaNacimiento,
        pais: req.body.pais,
        domicilio: req.body.domicilio
       } }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
