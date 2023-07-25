import {
  EXTRATO_CLUBE_LOGIN,
  EXTRATO_CLUBE_PASSWORD,
  EXTRATO_CLUBE_URL
} from '../config/config'
import { getSrcFromFrame } from './utills'

export const loginOnExtratoClube = async ({ browser, login, password }) => {
  try {
    const page = await browser.newPage()
    await page.goto(EXTRATO_CLUBE_URL, {
      waitUntil: 'domcontentloaded'
    })

    const htmlString = await page.frames()[0].content()

    const frameUrl = getSrcFromFrame(htmlString)

    const pageToLogin = await browser.newPage()
    await pageToLogin.goto(frameUrl, {
      waitUntil: 'domcontentloaded'
    })

    await pageToLogin.waitForSelector('input[formcontrolname="login"]')
    await pageToLogin.type('input[formcontrolname="login"]', login)
    await pageToLogin.waitForSelector('input[formcontrolname="senha"]')
    await pageToLogin.type('input[formcontrolname="senha"]', password)
    await pageToLogin.click('#botao')

    //validar se exibiu o model da dados invalidos

    // Aguarde o redirecionamento ou carregamento da próxima página após o login
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' })

    // Neste ponto, você está logado e pode explorar a próxima tela desbloqueada.

    // Feche o navegador após concluir as tarefas
    // await browser.close();

    return page
  } catch (error) {
    console.error('Ocorreu um erro:', error)
  }
}
