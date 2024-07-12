import Usuario from '../models/Usuario.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// función para generar el token
const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

// validaciones
class validaciones {
  static usuario = (usuario) => {
    if (typeof usuario !== 'string') { throw new Error('El campo usuario debe ser de tipo string') }
    if (usuario.length < 3) { throw new Error('El campo usuario debe tener al menos 3 caracteres') }
  }

  static password = (password) => {
    if (typeof password !== 'string') { throw new Error('El campo contraseña debe ser de tipo string') }
    if (password.length < 6) { throw new Error('El campo password debe tener al menos 6 caracteres') }
  }
}

// Registrar Usuario
export const register = async (req, res) => {
  const { usuario, password } = req.body

  try {
    let user = await Usuario.findOne({ usuario })
    if (user) { return res.status(400).json({ msg: 'El usuario ya existe' }) }
    validaciones.usuario(usuario)
    validaciones.password(password)
    user = new Usuario({ usuario, password })

    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(password, salt)
    await user.save()
    const token = await generarJWT(user.id)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
    })

    res.status(200).json({ msg: 'Usuario creado exitosamente' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: error.message || 'Algo salio mal' })
  }
}

// Iniciar Sesión
export const login = async (req, res) => {
  const { usuario, password } = req.body

  try {
    const user = await Usuario.findOne({ usuario })
    if (!user.usuario) { return res.status(400).json({ msg: 'El usuario no existe' }) }

    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) { return res.status(400).json({ msg: 'La contraseña es incorrecta' }) }

    const token = await generarJWT(user.id)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
    })
    res.json({ msg: 'Inicio de sesión exitoso' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Hubo un error al iniciar sesión' })
  }
}

// Cerrar Sesión
export const logout = (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) })
  res.json({ msg: 'Sesión cerrada correctamente' })
}

// Obtener usuario autenticado
export const getUser = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Hubo un error al obtener el usuario' })
  }
}
