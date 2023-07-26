import express from 'express'
import bodyParser from 'body-parser'
import { SERVER_PORT } from '../config/config'
import crawlerRoutes from './routes/api'
import cron from 'node-cron'
import { consumeMessages } from '../cron/crawl-data-on-queue'

const app = express()

app.use(bodyParser.json())

app.use('/api', crawlerRoutes)

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on ${SERVER_PORT} 🚀🔥`)
})

// '*/5 * * * * *' -> a cada 5 segundos consome as mensagens da fila
cron.schedule('*/5 * * * * *', consumeMessages, {
  scheduled: true,
  timezone: 'America/Sao_Paulo'
})
