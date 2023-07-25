import express from 'express'
import bodyParser from 'body-parser'
import { SERVER_PORT } from '../config/config'
import crawlerRoutes from './routes/api'

const app = express()

app.use(bodyParser.json())

app.use('/api', crawlerRoutes)

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on ${SERVER_PORT} 🚀🔥`)
})