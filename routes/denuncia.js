const express = require("express");
const router = express.Router();
const Denuncia = require("../models/Denuncia");

// Buscar Por Username
router.get("/:username", async (req, res) => {
  try {
    const denuncias = await Denuncia.find({
      "asegurado.email": req.params.username
    });
    res.json(denuncias);
  } catch (error) {
    res.json({ message: error });
  }
});

// Buscar por ID
router.get("/byId/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const denuncias = await Denuncia.find({ _id: req.params.id });
    console.log(denuncias);
    if (denuncias[0] != null) {
      res.json(denuncias[0]);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

// Actualizar una denuncia
router.patch("/:denunciaId", async (req, res) => {
  try {
    const denuncia = req.body;
    const updatedDenuncia = await Denuncia.updateOne(
      { _id: req.params.denunciaId },
      { $set: { 
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
       } }
    );
    res.json(updatedDenuncia);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
