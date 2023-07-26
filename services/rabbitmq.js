import amqp from 'amqplib'
import { RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_QUEUE } from '../config/config'

export const insertDataInQueue = async data => {
  try {
    const connection = await amqp.connect(
      `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`
    )
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
    const connection = await amqp.connect(
      `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`
    )
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
