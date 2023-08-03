import { Client } from '@elastic/elasticsearch'
import { ELASTIC_SEARCH_INDEX, ELASTIC_SEARCH_NODE } from '../config/config'

const client = new Client({ node: ELASTIC_SEARCH_NODE })

export const createIndex = async indexName => {
  await client.indices.create({ index: indexName || ELASTIC_SEARCH_INDEX })
}

export const indexData = async ({ indexName, data }) => {
  const { cpf, matricula } = data

  const { body } = await client.search({
    index: indexName || ELASTIC_SEARCH_INDEX,
    body: {
      query: {
        bool: {
          must: [
            { match: { 'cpf.keyword': cpf } },
            { match: { 'matricula.keyword': matricula } }
          ]
        }
      }
    }
  })

  if (body.hits.total.value !== 0) {
    console.log(
      'Já existe um registro com essse cpf e matricula, portando esse não será salvo para evitar dados duplicados'
    )
    return
  }

  await client.index({
    index: indexName || ELASTIC_SEARCH_INDEX,
    body: data
  })
}

export const getAllRecordsFromIndexByCPF = async ({
  indexName,
  cpf,
  page = 1,
  pageSize = 10
}) => {
  try {
    const from = (page - 1) * pageSize

    const response = await client.search({
      index: indexName || ELASTIC_SEARCH_INDEX,
      body: {
        query: {
          match: {
            'cpf.keyword': cpf
          }
        },
        sort: [{ _id: 'desc' }],
        from,
        size: pageSize
      }
    })

    const records = response.body.hits.hits
    const totalHits = response.body.hits.total.value

    const pageCount = Math.ceil(totalHits / pageSize)

    return {
      records,
      pagination: { page, pageSize, pageCount, total: totalHits }
    }
  } catch (error) {
    console.error('Erro ao buscar registros:', error)
    return []
  }
}
