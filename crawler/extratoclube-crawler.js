import puppeteer from 'puppeteer'
// import { putDataInQueue, getDataFromQueue } from '../services/rabbitmq'
// import { setCacheData, getCacheData } from '../services/redis'
// import { indexData } from '../services/elasticsearch'
import { loginOnExtratoClube } from '../helpers/crawler'

export const crawlAndProcess = async (cpf, login, senha) => {
  console.log('checkpoint1')
  // Altere para headless: true para executar em segundo plano sem interface gráfica.
  const browser = await puppeteer.launch({ headless: false })
  console.log('checkpoint2')

  const loggedPage = await loginOnExtratoClube(browser)

  // await browser.close();
  console.log('checkpoint3')

  console.log(loggedPage)

  // Implement the login process on the portal using puppeteer
  // Navigate to "MENU DE OPÇÕES" and click on "BENEFÍCIOS DE UM CPF"
  // Query the client's CPF and return the found benefit numbers
  const numerosMatriculas = [] // Array containing the found enrollment numbers

  // await browser.close()

  // Put the enrollment numbers in the RabbitMQ queue
  // await putDataInQueue(numerosMatriculas)

  // Check if there is cache data in Redis for the enrollments
  // for (const matricula of numerosMatriculas) {
  //   const cachedData = await getCacheData(matricula)
  //   if (cachedData) {
  //     // If it exists, return the data immediately
  //     return { matricula, data: cachedData }
  //   }
  // }

  // Implement the crawling process for each enrollment in the RabbitMQ queue
  // Index the data in Elasticsearch
  // Return the data for each enrollment
}
