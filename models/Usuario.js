import { Schema, model } from 'mongoose'

const UsuarioSchema = new Schema({
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

export default model('Usuario', UsuarioSchema)
