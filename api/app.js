import express from 'express'
import bodyParser from 'body-parser'
import { SERVER_PORT } from '../config/config'
import crawlerRoutes from './routes/api'
import { consumeMessages } from '../services/rabbitmq'
import process from 'process'
import path from 'path'

const app = express()

app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, '..', 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'web'))

app.use('/api', crawlerRoutes)

app.shutdown = () => process.exit()

process.on('SIGINT', () => app.shutdown())

process.on('SIGTERM', () => app.shutdown())

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on ${SERVER_PORT} 🚀🔥`)
})

consumeMessages()
