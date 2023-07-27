import { ELASTIC_SEARCH_INDEX } from '../../config/config'

import {
  createIndex,
  getAllRecordsFromIndex,
  indexData
} from '../../services/elasticsearch'

//get user data
export const show = async (req, res) => {
  const data = { rua: 'pimba', numero: 47 }

  // await createIndex().catch(err =>
  //   res
  //     .status(500)
  //     .json({ message: 'Erro ao tentar criar o index no elasticsearch', err })
  // )

  // await indexData({ data })

  const records = await getAllRecordsFromIndex('matriculas')

  res.status(201).json({ message: 'registros:', records })

  // res.status(200).json({ message: 'registro inserido' })
}

export default {
  show
}
