import { Schema, model } from 'mongoose'

const ProveedorSchema = Schema({

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
}, { versionkey: false })

export default model('Proveedor', ProveedorSchema)
