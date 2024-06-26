const Proveedor = require('../models/Proveedor')

exports.crearProveedor = async (req, res) => {
  try {
    const proveedor = new Proveedor(req.body);
    await proveedor.save();
    res.status(200).send(proveedor)
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al crear el proveedor')
  }
}

exports.mostrarProveedor = async (req, res) => {
  try {
    const proveedores = await Proveedor.find()
    res.json(proveedores)
  } catch (error) {
    console.error(error)
    res.status(500).send('Hubo un error al mostrar los proveedores')
  }
}

exports.modificarProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!proveedor) {
      res.status(404).send('Proveedor no encontrado')
    }
    res.json(proveedor)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al modificar el proveedor');
  }
}

exports.buscarProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id)
    if (proveedor) {
      res.json(proveedor)
    } else {
      res.status(404).json({ msg: "Proveedor no encontrado" })
    }
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error al buscar el proveedor" });
  }
}

exports.eliminarProveedor = async (req, res) => {
  try {
    const proveedores = Proveedor.findById(req.params.id)
    if (!proveedores) {
      res.status(404).send('No ha podido encontrarse el proveedor')
    } else {
      await Proveedor.findOneAndDelete({ _id: req.params.id })
      res.json({ msg: 'El cliente ha sido eliminado' });
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('No se ha podido eliminar el proveedor')
  }
}