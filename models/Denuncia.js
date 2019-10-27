const mongoose = require('mongoose');

const denunciaSchema = mongoose.Schema({
    direccion: String,
    fecha: String,
    hora: String,
    asegurado: {
        nombre: String,
        apellido: String,
        licencia: String,
        fechaNacimiento: String,
        pais: String,
        dni: String,
        detalle: String,
        email: String,
        domicilio: String
    },
    tercero: {
        nombre: String,
        apellido: String,
        licencia: String,
        fechaNacimiento: String,
        pais: String,
        dni: String,
        detalle: String,
        email: String,
        domicilio: String
    },
    imagePathPoliza: String,
    imagePathCedula: String,
    imagePathsLicencia: [String],
    imagePathsChoque: [String],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Denuncia', denunciaSchema);