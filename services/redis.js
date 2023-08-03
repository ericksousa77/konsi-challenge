import redis from 'redis'
import { promisify } from 'util'
import {
  REDIS_CACHE_EXPIRATION_TIME_IN_SECONDS,
  REDIS_HOST
} from '../config/config'

const client = redis.createClient(REDIS_HOST)

const getAsync = promisify(client.get).bind(client)
const setexAsync = promisify(client.setex).bind(client)

client.on('connect', () => {
  console.log('REDIS READY 🚀')
})

client.on('error', error => {
  console.error('Erro no Redis:', error)
})

async function setCacheData(key, data) {
  try {
    if (!key || !data) {
      console.warn(
        'Chave e valor são parametros obrigatórios para que um dado seja salvo em cache, portando esse dado não foi salvo'
      )
    }

    await setexAsync(key, 50, JSON.stringify(data))
  } catch (err) {
    console.error({
      message: 'erro ao tentar salvar os dados em cache no redis',
      err
    })
  }
}

async function getCacheData(key) {
  try {
    if (!key) {
      console.warn(
        'Chave é um parametro obrigatório para que um dado seja obtido em cache, portando esse dado não foi obtido'
      )
      return
    }
    const data = await getAsync(key)
    return data ? JSON.parse(data) : null
  } catch (err) {
    console.error({
      message: 'erro ao tentar obter os dados em cache no redis',
      err
    })
  }
}

export { setCacheData, getCacheData }
