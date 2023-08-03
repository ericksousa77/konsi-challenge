import puppeteer from 'puppeteer'

import {
  getBenefitsByCPF,
  loginOnExtratoClubeAndCloseUpdatesModal
} from '../helpers/crawler'
import { indexData } from '../services/elasticsearch'
import { dataToCrawlValidation, formatObjectForSave } from '../helpers/utills'
import { setCacheData } from '../services/redis'
import { PUPPETEER_EXECUTABLE_PATH } from '../config/config'

export const crawlAndProcess = async ({ cpf, login, password }) => {
  console.log('checkpoint1')

  const validationResult = await dataToCrawlValidation(cpf)

  if (validationResult.alreadyExistsOnCache) {
    console.log(
      'nao precisa crawlear novamente porque os dados ja foram crawleados e indexados recentemente'
    )

    return
  }

  const browser = await puppeteer
    .launch({
      headless: 'new', // opções: 'new' -> nao mostra o browser : false -> mostra o browser
      ignoreHTTPSErrors: true,
      executablePath: PUPPETEER_EXECUTABLE_PATH,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    })
    .catch(err => console.error(err))

  console.log('checkpoint2')

  console.time('tempo para crawlear')
  const homePage = await loginOnExtratoClubeAndCloseUpdatesModal({
    browser,
    login,
    password
  })

  const result = await getBenefitsByCPF({ homePage, cpf, browser })

  await browser.close()
  console.timeEnd('tempo para crawlear')

  console.log(result)

  if (!result) {
    console.log(`Nenhum dado encontrado para o usuário: ${cpf}`)
    return
  }

  const formatedDataToSave = formatObjectForSave({ cpf, result })

  await indexData({ data: formatedDataToSave })

  console.log(`beneficios do cpf ${cpf} salvos no elasticsearch`)

  await setCacheData(cpf, formatedDataToSave)

  console.log('checkpoint3')
}
