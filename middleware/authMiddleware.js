import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' })
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.user = data
    next()
  } catch (error) {
    console.log('Token inválido:', error)
    res.status(401).json({ msg: 'Token inválido' })
  }
}

export default auth
