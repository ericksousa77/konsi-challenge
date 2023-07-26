import { consumeMessages } from '../../cron/crawl-data-on-queue'
import { encrypt } from '../../helpers/security'
import { insertDataInQueue } from '../../services/rabbitmq'

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

// função para chamar a cron de fora manual
export const consumeChannel = async (req, res) => {
  await consumeMessages()

  res.status(200).json({ message: 'queue consumed:' })
}

export default {
  pushToQueue,
  consumeChannel
}
