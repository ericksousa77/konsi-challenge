import { getAllRecordsFromIndexByCPF } from '../../services/elasticsearch'

export const show = async (req, res) => {
  const { cpf, page, pageSize } = req.query

  const records = await getAllRecordsFromIndexByCPF({
    cpf,
    page,
    pageSize
  })

  res
    .status(200)
    .json({ message: 'registros de matricula encontrados:', ...records })
}

export const indexView = async (req, res) => {
  res.render('index')
}

export default {
  show,
  indexView
}
