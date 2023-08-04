import amqp from 'amqplib'
import { RABBITMQ_QUEUE, RABBITMQ_URL } from '../config/config'
import { crawlAndProcess } from '../crawler/extratoclube-crawler'
import { decrypt } from '../helpers/security'
import { processMessage } from '../helpers/utills'

export const insertDataInQueue = async data => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(RABBITMQ_QUEUE)
    channel.sendToQueue(RABBITMQ_QUEUE, Buffer.from(JSON.stringify(data)))
    await channel.close()
    await connection.close()
  } catch (err) {
    console.log(err)
  }
}

export const getDataFromQueue = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(RABBITMQ_QUEUE)
    const message = await channel.get(RABBITMQ_QUEUE)
    await channel.close()
    await connection.close()

    if (!message) {
      return null
    }
    return JSON.parse(message.content.toString())
  } catch (err) {
    console.log(err)
  }
}

export const consumeMessages = async () => {
  try {
    console.log('Consumidor pronto para receber mensagens...')

    console.log(`CONSUMINDO A FILA: ${RABBITMQ_QUEUE}`)

    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(RABBITMQ_QUEUE, { durable: true })

    await channel.prefetch(1)

    channel.consume(
      RABBITMQ_QUEUE,
      async message => {
        if (message) {
          try {
            const data = JSON.parse(message?.content?.toString())

            const decryptedPassword = decrypt(data?.senha)

            await crawlAndProcess(
              {
                cpf: data?.cpf,
                login: data?.login,
                password: decryptedPassword
              },
              channel,
              message
            )
          } catch (error) {
            console.error(error)
          }
        }
      },
      { noAck: false } // Define que as mensagens devem ser confirmadas explicitamente
    )
  } catch (error) {
    console.error(
      'Ocorreu um erro ao consumir as mensagens no rabbitmq:',
      error
    )
  }
}
