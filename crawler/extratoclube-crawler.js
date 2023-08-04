import puppeteer from 'puppeteer'

import {
  getBenefitsByCPF,
  loginOnExtratoClubeAndCloseUpdatesModal
} from '../helpers/crawler'
import { indexData } from '../services/elasticsearch'
import { dataToCrawlValidation, formatObjectForSave } from '../helpers/utills'
import { setCacheData } from '../services/redis'
import { PUPPETEER_EXECUTABLE_PATH } from '../config/config'

export const crawlAndProcess = async (
  { cpf, login, password },
  channel,
  message
) => {
  const validationResult = await dataToCrawlValidation(cpf)

  if (validationResult.alreadyExistsOnCache) {
    console.log(
      'nao precisa crawlear novamente porque os dados ja foram crawleados e indexados recentemente'
    )
    channel.ack(message)

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

  console.log(`iniciando crawler para o cpf (${cpf}) ...`)

  console.time('tempo para crawlear')
  const homePage = await loginOnExtratoClubeAndCloseUpdatesModal({
    browser,
    login,
    password
  })

  console.log('aqui1')
  const result = await getBenefitsByCPF({ homePage, cpf, browser })

  await browser.close()
  console.timeEnd('tempo para crawlear')

  console.log(
    `matricula encontrada no portal para o cpf (${cpf}) : matricula (${result})`
  )

  if (!result) {
    console.log(`Nenhum dado encontrado para o usuário: ${cpf}`)
    channel.nack(message)
    return
  }

  const formatedDataToSave = formatObjectForSave({ cpf, result })

  await indexData({ data: formatedDataToSave })

  await setCacheData(cpf, formatedDataToSave)

  console.log(`crawler finalizado para o cpf (${cpf})`)

  channel.ack(message)
}
