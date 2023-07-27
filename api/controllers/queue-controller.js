import { encrypt } from '../../helpers/security'
import { insertDataInQueue } from '../../services/rabbitmq'

/*
envia para a fila os dados a serem crawleados
*/
export const pushToQueue = async (req, res) => {
  const dataToQueue = req.body

  const dataToQueueParsed = dataToQueue.map(data => {
    const encryptedPassword = encrypt(data.senha)

    return {
      ...data,
      senha: encryptedPassword
    }
  })

  await Promise.all(
    dataToQueueParsed.map(async data => insertDataInQueue({ ...data }))
  )

  res.status(200).json({ message: 'data inserted on queue' })
}

export default {
  pushToQueue
}
