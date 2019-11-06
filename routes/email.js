process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const Denuncia = require("../models/Denuncia");

router.post("/", (req, res) => {
  try {
    sendEmail(req.body.asegurado);
    saveDenuncia(req.body);

    res.email;
  } catch (error) {
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
    } else {
      console.log("Se envio");
    }
  });
}

async function saveDenuncia(denuncia) {
  const denunciaL = new Denuncia({
    calle: denuncia.calle,
    altura: denuncia.altura,
    fecha: denuncia.fecha,
    hora: denuncia.hora,
    asegurado: denuncia.asegurado,
    tercero: denuncia.tercero,
    imagePathPoliza: denuncia.imagePathPoliza,
    imagePathCedula: denuncia.imagePathCedula,
    imagePathsLicencia: denuncia.imagePathsLicencia,
    imagePathsChoque: denuncia.imagePathsChoque,
    imagePathsExtras: denuncia.imagePathsExtras,
    datos: denuncia.datos,
    esEsquina: denuncia.esEsquina,
    esDobleMano: denuncia.esDobleMano
  });
  try {
    const savedDenuncia = await denunciaL.save();
    res.json(savedDenuncia);
    console.log(saveDenuncia);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
}

module.exports = router;
