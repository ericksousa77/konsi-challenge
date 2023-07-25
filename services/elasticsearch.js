import { Client } from '@elastic/elasticsearch'
import { ELASTIC_SEARCH_INDEX, ELASTIC_SEARCH_NODE } from '../config/config'

const client = new Client({ node: ELASTIC_SEARCH_NODE })

export const createIndex = async indexName => {
  await client.indices.create({ index: indexName || ELASTIC_SEARCH_INDEX })
}

export const indexData = async ({ index, data }) => {
  await client.index({
    index: index || ELASTIC_SEARCH_INDEX,
    body: data
  })
}

export const getAllRecordsFromIndex = async indexName => {
  try {
    const response = await client.search({
      index: indexName,
      body: {
        query: {
          match_all: {} // Consulta vazia para buscar todos os documentos
        }
      }
    })

    console.log(response?.body?.hits?.hits)

    const records = response.body.hits.hits
    return records
  } catch (error) {
    console.error('Erro ao buscar registros:', error)
    return []
  }
}
