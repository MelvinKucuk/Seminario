process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

router.post("/", (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.email);
    sendEmail(req.body);

    res.email;
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

function sendEmail(body) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "crashapp9@gmail.com",
      pass: "Seminario1234"
    }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: "some/path",
      layoutsDir: "./views/index",
      defaultLayout: ""
    },
    viewPath: "./views/",
    extName: ".handlebars"
  };

  transporter.use("compile", hbs(handlebarOptions));

  let mailOptions = {
    from: "seminarioprueba5000@gmail.com",
    to: body.email,
    subject: "Prueba Mail",
    text: "Probando Mail",
    template: "index",
    context: {
      nombre: body.nombre,
      apellido: body.apellido,
      fecha: body.fechaNacimiento,
      dni: body.dni,
      domicilio: body.domicilio,
      pais: body.pais,
      detalle: body.detalle
    }
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error");
      console.log(err);
    } else {
      console.log("Se envio");
    }
  });
}

module.exports = router;