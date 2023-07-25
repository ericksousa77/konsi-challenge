import { ELASTIC_SEARCH_INDEX } from '../../config/config'
import { crawlAndProcess } from '../../crawler/extratoclube-crawler'
import {
  createIndex,
  getAllRecordsFromIndex,
  indexData
} from '../../services/elasticsearch'

export const create = async (req, res) => {
  const { cpf, login, senha: password } = req.body

  console.log({ cpf, login, password })

  const result = await crawlAndProcess({ cpf, login, password }).catch(err =>
    res.status(500).json({
      error: { message: 'Error during crawling and processing.', err }
    })
  )
  res.json(result)
}

export const show = async (req, res) => {
  const data = { rua: 'pimba', numero: 47 }

  // console.log('antes')
  // await createIndex().catch(err =>
  //   res
  //     .status(500)
  //     .json({ message: 'Erro ao tentar criar o index no elasticsearch', err })
  // )

  console.log('antes')

  // await indexData({ data })

  const records = await getAllRecordsFromIndex('matriculas')

  console.log('depois')

  res.status(201).json({ message: 'registros:', records })

  // res.status(200).json({ message: 'registro inserido' })
}

export default {
  create,
  show
}
