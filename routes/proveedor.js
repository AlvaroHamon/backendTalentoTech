import { Router } from 'express'
import { crearProveedor, mostrarProveedor, modificarProveedor, buscarProveedor, eliminarProveedor } from '../controllers/proveedorController.js'
import auth from '../middleware/authMiddleware.js'
const router = Router()

//  creamos rutas del CRUD
router.post('/', auth, crearProveedor)
router.get('/', auth, mostrarProveedor)
router.put('/:id', auth, modificarProveedor)
router.get('/:id', auth, buscarProveedor)
router.delete('/:id', auth, eliminarProveedor)

export default router
