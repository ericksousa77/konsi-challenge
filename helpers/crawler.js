import {
  EXTRATO_CLUBE_LOGIN,
  EXTRATO_CLUBE_PASSWORD,
  EXTRATO_CLUBE_URL
} from '../config/config'
import { getSrcFromFrame } from './utills'

export const loginOnExtratoClubeAndCloseUpdatesModal = async ({
  browser,
  login,
  password
}) => {
  try {
    const page = await browser.newPage()
    await page.goto(EXTRATO_CLUBE_URL, {
      waitUntil: 'domcontentloaded'
    })

    const htmlStringForInitialPage = await page.frames()[0].content()

    await page.close()

    const frameUrlForInitialPage = getSrcFromFrame(htmlStringForInitialPage)

    const pageToLogin = await browser.newPage()

    await pageToLogin.goto(frameUrlForInitialPage, {
      waitUntil: 'domcontentloaded'
    })

    await pageToLogin.waitForSelector('input[formcontrolname="login"]')
    await pageToLogin.type('input[formcontrolname="login"]', login)
    await pageToLogin.waitForSelector('input[formcontrolname="senha"]')
    await pageToLogin.type('input[formcontrolname="senha"]', password)
    await pageToLogin.click('#botao')

    //validar se exibiu o model da dados invalidos

    // Aguarda o redirecionamento ou carregamento da próxima página após o login
    await pageToLogin.waitForNavigation({ waitUntil: 'networkidle0' })

    const homePageFrame = await pageToLogin.frames()[0]

    await homePageFrame.waitForSelector('ion-button[title="Fechar"]')

    await homePageFrame.click('ion-button[title="Fechar"]')

    //clickar no botão de beneficios
    // await homePageFrame.click('ion-button[expand="full"]')

    return homePageFrame
  } catch (error) {
    console.error('Ocorreu um erro:', error)
  }
}
