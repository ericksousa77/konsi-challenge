import { getCacheData } from '../services/redis'

export const getSrcFromFrame = htmlString => {
  const pattern = /<frame src="(.*?)" frameborder="0">/

  const match = htmlString.match(pattern)

  if (!match) {
    console.log('URL não encontrada.')
  }

  const url = match[1]

  return url
}

export const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//mock function
export const processMessage = async msg => {
  // Simula algum processamento levemente demorado
  await new Promise(resolve => setTimeout(resolve, 100))
  console.log(`Mensagem processada: ${msg?.content?.toString()}`)
}

export const mockCrawlReturn = cpf => ({
  cpf,
  name: 'Nome Mockado 3',
  benefit: 'Bradesco'
})

export const dataToCrawlValidation = async cpf => {
  const dataOnCache = await getCacheData(cpf)

  if (dataOnCache) {
    return {
      alreadyExistsOnCache: true,
      dataOnCache
    }
  }

  return {
    alreadyExistsOnCache: false
  }
}

export const formatObjectForSave = ({ cpf, result }) => ({
  cpf,
  matricula: result
})
