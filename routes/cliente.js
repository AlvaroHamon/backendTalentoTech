import { Router } from 'express'
import { agregarClientes, mostrarClientes, buscarCliente, actualizarClientes, eliminarClientes } from '../controllers/clienteController.js'
import auth from '../middleware/authMiddleware.js'
const router = Router()

// Creamos la ruta del crud
router.post('/', auth, agregarClientes)
router.get('/', auth, mostrarClientes)
router.get('/:id', auth, buscarCliente)
router.put('/:id', auth, actualizarClientes)
// router.patch('/:id', auth, modificarClientes);
router.delete('/:id', auth, eliminarClientes)

export default router
