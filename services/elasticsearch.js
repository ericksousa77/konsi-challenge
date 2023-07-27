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

export const getAllRecordsFromIndexByCPF = async ({
  indexName,
  cpf,
  page = 1,
  pageSize = 10
}) => {
  try {
    const from = (page - 1) * pageSize

    const response = await client.search({
      index: indexName,
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

    return { records, pagination: { page, pageSize, pageCount } }
  } catch (error) {
    console.error('Erro ao buscar registros:', error)
    return []
  }
}
