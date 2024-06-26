const express = require("express");
const ConectarBD = require('../config/db');
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 5000;

//enlazar conexión a la base de datos
ConectarBD();
app.use(cors());
app.use(express.json());
app.use('/api/clientes', require('../routes/cliente'));
app.use('/api/proveedores', require('../routes/proveedor'))

app.get('/', (req, res) => {
  res.send('Bienvenido estamos desde el servidor');
})

app.listen(PORT, () => console.log('Estamos conectados con el servidor en el puerto: ', PORT));
