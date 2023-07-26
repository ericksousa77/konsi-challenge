import puppeteer from 'puppeteer'
// import { setCacheData, getCacheData } from '../services/redis'
// import { indexData } from '../services/elasticsearch'
import { loginOnExtratoClube } from '../helpers/crawler'

export const crawlAndProcess = async ({ cpf, login, password }) => {
  console.log('checkpoint1')
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true
  })
  console.log('checkpoint2')

  //login process
  const loggedPage = await loginOnExtratoClube({ browser, login, password })

  //navegar para a aba "beneficios de um cpf"

  //buscar os dados correspondentes a mensagem na fila

  //salvar os dados crawleados no rabbit mq

  // await browser.close();
  console.log('checkpoint3')

  console.log(loggedPage)

  // Implement the login process on the portal using puppeteer
  // Navigate to "MENU DE OPÇÕES" and click on "BENEFÍCIOS DE UM CPF"
  // Query the client's CPF and return the found benefit numbers
  const numerosMatriculas = [] // Array containing the found enrollment numbers

  // await browser.close()
}
