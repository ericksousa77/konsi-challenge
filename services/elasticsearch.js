import { Client } from '@elastic/elasticsearch'
import { ELASTIC_SEARCH_NODE } from '../config/config'

const node = ELASTIC_SEARCH_NODE

const client = new Client({ node })

async function indexData(index, data) {
  await client.index({
    index,
    body: data
  })
}

export { indexData }
