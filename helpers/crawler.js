import { EXTRATO_CLUBE_URL } from '../config/config'
import { getSrcFromFrame, timeout } from './utills'

let loginPage

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

    await pageToLogin.waitForNavigation({ waitUntil: 'networkidle0' })

    const homePageFrame = await pageToLogin.frames()[0]

    await homePageFrame.waitForSelector('ion-button[title="Fechar"]')

    await homePageFrame.click('ion-button[title="Fechar"]')

    await homePageFrame.waitForSelector('ion-menu[menu-id="first"]')

    await homePageFrame.click('ion-menu[menu-id="first"]')

    loginPage = pageToLogin
    return homePageFrame
  } catch (error) {
    console.error('Ocorreu um erro:', error)
    await browser.close()
  }
}

export const getBenefitsByCPF = async ({ homePage, cpf, browser }) => {
  try {
    await homePage.waitForSelector(
      'xpath=//*[@id="extratoonline"]/ion-row[2]/ion-col/ion-card'
    )

    const buttons = await homePage.$$('ion-button')
    for (const button of buttons) {
      const buttonText = await button.evaluate(el => el.textContent.trim())
      if (buttonText === 'Encontrar Benefícios de um CPF') {
        await timeout(500)
        await button.click()
        break
      }
    }

    const inputXPath =
      '//*[@id="extratoonline"]/ion-row[2]/ion-col/ion-card/ion-grid/ion-row[2]/ion-col/ion-card/ion-item/ion-input/input'
    await homePage.waitForXPath(inputXPath)

    const [inputBeneficio] = await homePage.$x(inputXPath)
    await timeout(500)

    await inputBeneficio.type(cpf)

    await loginPage.keyboard.press('Tab', { delay: 500 })

    await loginPage.keyboard.press('Enter', { delay: 500 })

    const userDataCrawled = await homePage.evaluate(() => {
      const itemElement = document.querySelectorAll(
        '.item.md.ion-focusable.hydrated.item-label'
      )
      const userData = itemElement[0].querySelector('ion-label').innerText
      return userData
    })

    await timeout(200)

    if (!userDataCrawled) {
      return null
    }

    return userDataCrawled
  } catch (err) {
    console.log('erro ao tentar obter os beneficios por CPF', err)
    await browser.close()
  }
}
