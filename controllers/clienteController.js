import Cliente from '../models/Cliente.js'

// Función agregar clientes
export const agregarClientes = async (req, res) => {
  try {
    const clientes = new Cliente(req.body)
    await clientes.save()
    res.send(clientes)
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al agregar un cliente')
  }
}

// Crear una función que nos va a mostrar todos los clientes
export const mostrarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find()
    res.json(clientes)
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al mostrar los clientes')
  }
}

// Función para mostrar un cliente
export const buscarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id)

    if (!cliente) {
      res.status(404).json({ msg: 'No se encuentra el cliente' })
    } else {
      res.json(cliente)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al consultar el cliente')
  }
}

// Función para actualizar un cliente
export const actualizarClientes = async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndUpdate(
      { _id: req.params.id }, req.body)

    if (!cliente) res.status(404).send('Cliente no encontrado')
    else {
      res.json(cliente)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al actualizar el cliente')
  }
}

// Función para modificar un cliente
export const modificarClientes = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!cliente) {
      return res.status(404).send('Cliente no encontrado')
    }
    res.json(cliente)
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al modificar el cliente')
  }
}

// Función para eliminar un cliente
export const eliminarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findById(req.params.id)
    if (!clientes) {
      res.status(404).send('Cliente no encontrado')
    } else {
      await Cliente.findOneAndDelete({ _id: req.params.id })
      res.json({ msg: 'El cliente ha sido eliminado' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al eliminar el cliente')
  }
}
