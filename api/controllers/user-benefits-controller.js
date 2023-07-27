import { getAllRecordsFromIndexByCPF } from '../../services/elasticsearch'

export const show = async (req, res) => {
  const { cpf, page, pageSize } = req.query

  const records = await getAllRecordsFromIndexByCPF({
    indexName: 'matriculas',
    cpf,
    page,
    pageSize
  })

  res.status(201).json({ message: 'registros:', ...records })
}

export default {
  show
}
