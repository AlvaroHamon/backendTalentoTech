const mongoose = require('mongoose');

const ProveedorSchema = mongoose.Schema({

  razonSocial: {
    type: String,
    require: true
  },

  nit: {
    type: Number,
    require: true
  },
  correo: {
    type: String,
    require: true
  },
  contacto: {
    type: Number,
    require: true
  },
  direccion: {
    type: String,
    require: true
  }
}, { versionkey: false });

module.exports = mongoose.model('Proveedor', ProveedorSchema);