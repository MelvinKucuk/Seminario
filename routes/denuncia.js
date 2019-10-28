const express = require('express');
const router = express.Router();
const Denuncia = require('../models/Denuncia');

// Ejemplo de fetch por id
router.get('/:username', async (req, res) => {
    try {
        console.log({ 'asegurado.email' : req.params.username});
        const denuncias = await Denuncia.find( {'asegurado.email' : req.params.username} );
        console.log(denuncias);
        res.json(denuncias);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});


// Ejemplo actualizar un post
router.patch('/:denunciaId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } });
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;