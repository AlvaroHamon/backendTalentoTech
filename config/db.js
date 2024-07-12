import { connect } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const ConectarBD = () => {
  connect(process.env.MONGO_URL)
    .then(() => console.log('Estamos conectados con MongoDB'))
    .catch((e) => console.error(e))
}

export default ConectarBD
