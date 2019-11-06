const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: String,
  date: {
    type: String,
    required: true
  },
  nombre: String,
  apellido: String,
  dni: String,
  fechaNacimiento: String,
  pais: String,
  domicilio: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
