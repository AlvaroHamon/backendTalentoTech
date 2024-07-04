const mongoose = require('mongoose')
require('dotenv').config()

const ConectarBD = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Estamos conectados con MongoDB'))
    .catch((e) => console.error(e))
}

module.exports = ConectarBD
