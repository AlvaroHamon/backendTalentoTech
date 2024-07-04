const mongoose = require('mongoose')

const ClienteSchema = mongoose.Schema({

  nombres: {
    type: String,
    require: true
  },

  apellidos:
  {
    type: String,
    require: true
  },
  cedula: {
    type: Number,
    require: true
  },
  correo: {
    type: String,
    require: true
  },
  numeroContacto: {
    type: Number,
    require: true
  },
  nit: {
    type: Number,
    require: true
  },
  direccion: {
    type: String,
    require: true
  }
}, { versionkey: false })

module.exports = mongoose.model('Cliente', ClienteSchema)
