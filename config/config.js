import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

export const SERVER_PORT = process.env.SERVER_PORT || 3000

export const ELASTIC_SEARCH_NODE =
  process.env.ELASTIC_SEARCH_NODE || 'http://localhost:9200'
export const ELASTIC_SEARCH_INDEX =
  process.env.ELASTIC_SEARCH_INDEX || 'matriculas'

export const RABBITMQ_URL =
  process.env.RABBITMQ_URL || 'amqp://guest@rabbitmq:5672'
export const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE || 'matriculas_queue'

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
export const REDIS_PORT = process.env.REDIS_PORT || 6379
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'redispw'

export const REDIS_CACHE_EXPIRATION_TIME_IN_SECONDS =
  parseInt(process.env.REDIS_CACHE_EXPIRATION_TIME_IN_SECONDS, 10) || 43200 // 12 horas

export const EXTRATO_CLUBE_URL = process.env.EXTRATO_CLUBE_URL

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
export const ENCRYPTION_ALGORITHM = process.env.ENCRYPTION_ALGORITHM

export const PUPPETEER_EXECUTABLE_PATH = process.env.PUPPETEER_EXECUTABLE_PATH
