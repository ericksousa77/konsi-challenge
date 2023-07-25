import puppeteer from 'puppeteer'
import {
  EXTRATO_CLUBE_LOGIN,
  EXTRATO_CLUBE_PASSWORD,
  EXTRATO_CLUBE_URL
} from '../config/config'

console.log(EXTRATO_CLUBE_LOGIN, EXTRATO_CLUBE_PASSWORD)

export const loginOnExtratoClube = async browser => {
  try {
    const page = await browser.newPage()
    await page.goto(
      //   'http://ionic-application.s3-website-sa-east-1.amazonaws.com/',
      EXTRATO_CLUBE_URL,
      {
        waitUntil: 'domcontentloaded'
      }
    )

    console.log('erick', await page.frames())

    // const framesetContent = await page.evaluate(() => {
    //   const frameset = document.querySelector('.frameset-class') // Substitua .frameset-class pelo seletor de classe correto
    //   return frameset ? frameset.getAttribute('src') : null
    // })
    // if (!framesetContent) {
    //   console.log('Não foi possível encontrar o frameset ou a URL dentro dele.')
    // }

    // await page.goto(framesetContent, {
    //   waitUntil: 'domcontentloaded'
    // })

    // await page.waitForSelector('input[formcontrolname="login"]')

    // // Inserir um valor no campo de login
    // await page.type('input[formcontrolname="login"]', 'seu_nome_de_usuario')

    // const teste = await page.frames()

    // console.log('erick', teste[0].html)

    // console.log(page.fame)
    // //to pegando o primeiro frame, mas poderia fazer de alguma forma melhor
    // const frame = await page
    //   .frames()
    //   .find(
    //     f =>
    //       f.url() ===
    //       'http://ionic-application.s3-website-sa-east-1.amazonaws.com/'
    //   )

    // console.log(frame)

    // if (!frame) {
    //   console.log('iFrame not found with the specified url')
    // }

    // await page.goto(frame.url(), { waitUntil: 'domcontentloaded' })
    // Navegar para o frame
    // await page.goto(
    //   'http://ionic-application.s3-website-sa-east-1.amazonaws.com/',
    //   { waitUntil: 'domcontentloaded' }
    // )

    // Preencha o formulário de login

    // await page.type('#user', 'radbr') // Substitua SEU_USUARIO pelo seu nome de usuário

    // await page.type('#user', 'radbr') // Substitua SEU_USUARIO pelo seu nome de usuário
    // await page.type('#pass', EXTRATO_CLUBE_PASSWORD) // Substitua SUA_SENHA pela sua senha
    // await page.click('#botao')

    // Clique no botão de login
    // await page.click('[name=btnK]') // Usamos o seletor do botão usando a classe "botao2"

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
