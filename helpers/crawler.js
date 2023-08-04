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
    console.log('aqui2')

    await homePage.waitForSelector(
      'xpath=//*[@id="extratoonline"]/ion-row[2]/ion-col/ion-card'
    )
    console.log('aqui3')

    const buttons = await homePage.$$('ion-button')
    for (const button of buttons) {
      const buttonText = await button.evaluate(el => el.textContent.trim())
      if (buttonText === 'Encontrar Benefícios de um CPF') {
        await timeout(500)
        await button.click()
        break
      }
    }

    console.log('aqui4')

    const inputXPath =
      '//*[@id="extratoonline"]/ion-row[2]/ion-col/ion-card/ion-grid/ion-row[2]/ion-col/ion-card/ion-item/ion-input/input'
    await homePage.waitForXPath(inputXPath)
    console.log('aqui5')

    const [inputBeneficio] = await homePage.$x(inputXPath)
    await timeout(500)
    console.log('aqui6')

    await inputBeneficio.type(cpf)
    console.log('aqui7')

    await loginPage.keyboard.press('Tab', { delay: 500 })
    console.log('aqui8')

    await loginPage.keyboard.press('Enter', { delay: 500 })
    console.log('aqui9')

    await timeout(200)
    console.log('aqui10')

    const userDataCrawled = await homePage.evaluate(() => {
      console.log('aqui 10.1')
      const itemElement = document.querySelectorAll(
        '.item.md.ion-focusable.hydrated.item-label'
      )
      console.log('aqui 10.2')

      const userData = itemElement[0].querySelector('ion-label').innerText
      console.log('aqui 10.3')

      return userData
    })
    console.log('aqui11')

    await timeout(200)

    if (!userDataCrawled) {
      return null
    }
    console.log('aqui12')

    return userDataCrawled
  } catch (err) {
    console.log('erro ao tentar obter os beneficios por CPF', err)
    await browser.close()
  }
}
