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

export const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost'
export const RABBITMQ_PORT = process.env.RABBITMQ_PORT || 5672
export const RABBITMQ_USERNAME = process.env.RABBITMQ_USERNAME || 'guest'
export const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD || 'guest'
export const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE || 'matriculas_queue'

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
export const REDIS_PORT = process.env.REDIS_PORT || 6379

export const EXTRATO_CLUBE_URL = process.env.EXTRATO_CLUBE_URL
export const EXTRATO_CLUBE_LOGIN = process.env.EXTRATO_CLUBE_LOGIN
export const EXTRATO_CLUBE_PASSWORD = process.env.EXTRATO_CLUBE_PASSWORD

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
export const ENCRYPTION_ALGORITHM = process.env.ENCRYPTION_ALGORITHM
