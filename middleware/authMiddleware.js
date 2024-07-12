import jwt from 'jsonwebtoken'
// import Usuario from '../models/Usuario.js'

const auth = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.id
    next()
  } catch (error) {
    return res.status(401).json({ msg: 'El Token no es válido' })
  }
}

export default auth
