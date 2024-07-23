import Usuario from '../models/Usuario.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// función para generar el token
const generarJWT = (id, usuario) => {
  return jwt.sign({ id, usuario }, process.env.JWT_SECRET, {
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
    const token = generarJWT(user.id, user.usuario)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
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
    if (!user) { return res.status(400).json({ msg: 'El usuario no existe' }) }

    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) { return res.status(400).json({ msg: 'La contraseña es incorrecta' }) }

    const token = generarJWT(user.id, user.usuario)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })

    res.json({ msg: 'Inicio de sesión exitoso' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Hubo un error al iniciar sesión' })
  }
}

// Cerrar Sesión
export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    expires: new Date(0)
  })
  res.set('Cache-Control', 'no-store')
  res.json({ msg: 'Sesión cerrada correctamente' })
}

// Obtener usuario autenticado
export const getUser = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id).select('-password')
    if (!usuario) {
      return res.status(400).json({ msg: 'No existe un usuario con ese ID' })
    }

    res.json({ id: usuario.id, usuario: usuario.usuario })
  } catch (error) {
    console.log('Error al obtener el usuario:')
    res.status(500).json({ msg: 'Hubo un error al obtener el usuario' })
  }
}
