const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

// Registrar Usuario
exports.registerUser = async (req, res) => {
  const { usuario, email, password } = req.body
  try {
    let user = await Usuario.findOne({ email })
    if (user) {
      res.status(400).json({ msg: 'El usuario ya existe' })
    }
    user = new Usuario({
      usuario,
      email,
      password
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.save()
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
}

// Iniciar Sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await Usuario.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' })
    }
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// Obtener usuario autenticado
exports.getUser = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}
