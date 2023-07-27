import puppeteer from 'puppeteer'
// import { setCacheData, getCacheData } from '../services/redis'
import { loginOnExtratoClubeAndCloseUpdatesModal } from '../helpers/crawler'
import { indexData } from '../services/elasticsearch'
import { mockCrawlReturn } from '../helpers/utills'

export const crawlAndProcess = async ({ cpf, login, password }) => {
  console.log('checkpoint1')
  const browser = await puppeteer.launch({
    headless: 'new', // a outra opção é false
    ignoreHTTPSErrors: true
  })
  console.log('checkpoint2')

  //login process
  console.time('tempo para crawlear')
  const homePage = await loginOnExtratoClubeAndCloseUpdatesModal({
    browser,
    login,
    password
  })

  //navegar para a aba "beneficios de um cpf"

  // const result = await getBenefitsData({homePage, cpf })

  const result = mockCrawlReturn(cpf)

  console.timeEnd('tempo para crawlear')

  await indexData({ data: result })

  console.log(`beneficios do cpf ${cpf} salvos no elasticsearch`)

  console.log('checkpoint3')

  // console.log(homePage)

  // await browser.close()
}
