import redis from 'redis'
import { promisify } from 'util'
import { REDIS_HOST, REDIS_PORT } from '../config/config'

const client = redis.createClient({
  REDIS_HOST,
  REDIS_PORT
})

const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

client.on('error', error => {
  console.error('Erro no Redis:', error)
})

async function setCacheData(key, data) {
  await setAsync(key, JSON.stringify(data))
}

async function getCacheData(key) {
  const data = await getAsync(key)
  return data ? JSON.parse(data) : null
}

export { setCacheData, getCacheData }
