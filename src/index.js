import express, { json } from 'express'
import ConectarBD from '../config/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// importamos las rutas
import clientesRoutes from '../routes/cliente.js'
import proveedorRoutes from '../routes/proveedor.js'
import usuarioRoutes from '../routes/usuario.js'

const app = express()

const allowedOrigins = [
  'https://front-end-talento-tech.vercel.app',
  'http://localhost:5173'
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(json())
app.use(cookieParser())

// enlazar conexión a la base de datos
ConectarBD()

const PORT = process.env.PORT || 5000

app.use('/api/clientes', clientesRoutes)
app.use('/api/proveedores', proveedorRoutes)
app.use('/api/auth', usuarioRoutes)

app.get('/', (req, res) => {
  res.send('<h1>Bienvenido estamos desde el servidor</h1>')
})

app.listen(PORT, () => console.log(`Estamos conectados con el servidor en el puerto: ${PORT}`))
