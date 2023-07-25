import amqp from 'amqplib'
import { RABBITMQ_QUEUE } from '../config/config'

const queueName = RABBITMQ_QUEUE

export const putDataInQueue = async data => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue(queueName)
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
  await channel.close()
  await connection.close()
}

export const getDataFromQueue = async () => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue(queueName)
  const message = await channel.get(queueName)
  await channel.close()
  await connection.close()

  if (message) {
    return JSON.parse(message.content.toString())
  }

  return null
}
