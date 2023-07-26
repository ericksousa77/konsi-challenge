import amqp from 'amqplib'
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_QUEUE } from '../config/config'
import { crawlAndProcess } from '../crawler/extratoclube-crawler'
import { decrypt } from '../helpers/security'

export const consumeMessages = async () => {
  try {
    let amountOfMessagesConsumed = 0
    console.log('CRON INICIOU')
    const connection = await amqp.connect(
      `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`
    )
    const channel = await connection.createChannel()
    await channel.assertQueue(RABBITMQ_QUEUE, { durable: true })

    console.log('Consumidor pronto para receber mensagens...')

    await channel.consume(
      RABBITMQ_QUEUE,
      message => {
        if (message !== null) {
          const data = JSON.parse(message.content.toString())
          console.log('Mensagem recebida:', data)

          const decryptedPassword = decrypt(data?.senha)
          console.log('senha decriptada: ', decryptedPassword)

          //   const result = await crawlAndProcess({
          //     cpf: data?.cpf,
          //     login: data?.login,
          //     password: decryptedPassword
          //   })

          // Confirma o recebimento da mensagem para removê-la da fila
          channel.ack(message)
          amountOfMessagesConsumed += 1
          console.log('Confirmação de mensagem consumida')
        }
      },
      { noAck: false } // Define que as mensagens devem ser confirmadas explicitamente
    )
    await channel.close()
    await connection.close()
    console.log(
      `CRON FINALIZA - TOTAL DE MENSAGENS CONSUMIDAS: ${amountOfMessagesConsumed}`
    )
  } catch (error) {
    console.error(
      'Ocorreu um erro ao consumir as mensagens no rabbitmq:',
      error
    )
  }
}
