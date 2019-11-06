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

// Ejemplo actualizar un post
router.patch("/:denunciaId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
