import { Schema, model } from 'mongoose'

const ClienteSchema = Schema({

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

export default model('Cliente', ClienteSchema)
