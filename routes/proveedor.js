const express = require('express');
const router = express.Router();
const proveedorContoller = require('../controllers/proveedorController');

//creamos rutas del CRUD

router.post('/', proveedorContoller.crearProveedor);
router.get('/', proveedorContoller.mostrarProveedor);
router.put('/:id', proveedorContoller.modificarProveedor)
router.get('/:id', proveedorContoller.buscarProveedor)
router.delete('/:id', proveedorContoller.eliminarProveedor)

module.exports = router