const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Importar rutas

const postRoutes = require('./routes/posts')

app.use('/posts', postRoutes);

//Rutas
app.get('/', (req, res) => {
    res.send('estamos en home')
});



//Conectar BD
// var urlBD = 'mongodb://localhost/prueba'; URL Local
var urlBD = process.env.DB_CONNECTION;
//Opciones conexion
var opts = { useNewUrlParser: true, connectTimeoutMS: 20000 };
//Pruebo conexion
mongoose.connect(urlBD, opts).then
    (
        () => {
            console.log("Conectado a bd");
        },
        err => {
            console.log("ERROR:" + err);
        }
    );



// Configurar puerto local
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}

// Escuchar a puerto especifico
app.listen(port, function () {
    console.log("Ejecuntando en el puerto " + port);
});

