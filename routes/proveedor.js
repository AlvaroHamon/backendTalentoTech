const express = require('express')
const router = express.Router()
const proveedorController = require('../controllers/proveedorController')

//  creamos rutas del CRUD
router.post('/', proveedorController.crearProveedor)
router.get('/', proveedorController.mostrarProveedor)
router.put('/:id', proveedorController.modificarProveedor)
router.get('/:id', proveedorController.buscarProveedor)
router.delete('/:id', proveedorController.eliminarProveedor)

module.exports = router
