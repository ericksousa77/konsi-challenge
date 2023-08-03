import { getAllRecordsFromIndexByCPF } from '../../services/elasticsearch'
import { getCacheData, setCacheData } from '../../services/redis'

export const show = async (req, res) => {
  const { cpf, page, pageSize } = req.query

  const records = await getAllRecordsFromIndexByCPF({
    cpf,
    page,
    pageSize
  })

  res
    .status(201)
    .json({ message: 'registros de matricula encontrados:', ...records })
}

export const testSetAndGetOnRedis = async (req, res) => {
  const { key, name } = req.query

  console.log({ key, name })

  // const dataToCache = { name, ano: 2019, modelo: 'Onix' }

  // await setCacheData(key, dataToCache)

  const dataFromCache = await getCacheData(key)

  res.status(201).json({ message: 'registros no cache:', ...dataFromCache })
}

export default {
  show,
  testSetAndGetOnRedis
}
