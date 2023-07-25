import amqp from 'amqplib'
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_QUEUE } from '../config/config'

export const putDataInQueue = async data => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue(RABBITMQ_QUEUE)
  await channel.sendToQueue(RABBITMQ_QUEUE, Buffer.from(JSON.stringify(data)))
  await channel.close()
  await connection.close()
}

export const getDataFromQueue = async () => {
  const connection = await amqp.connect(
    `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`
  )
  const channel = await connection.createChannel()
  await channel.assertQueue(RABBITMQ_QUEUE)
  const message = await channel.get(RABBITMQ_QUEUE)
  await channel.close()
  await connection.close()

  if (message) {
    return JSON.parse(message.content.toString())
  }

  return null
}
