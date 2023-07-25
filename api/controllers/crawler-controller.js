import { crawlAndProcess } from '../../crawler/extratoclube-crawler'

export const create = async (req, res) => {
  const { cpf, login, senha } = req.body

  console.log({ cpf, login, senha })

  const result = await crawlAndProcess(cpf, login, senha).catch(err =>
    res.status(500).json({
      error: { message: 'Error during crawling and processing.', err }
    })
  )
  res.json(result)
}

export const show = async (req, res) => 'retorno show'

export default {
  create,
  show
}
