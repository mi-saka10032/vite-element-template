import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import table from '../../mock/table'
import user from '../../mock/user'

const mocks = [...table, ...user]
export function setupProdMockServer(prefix) {
  mocks.forEach(api => {
    // add mock prefix
    if (api.url) api.url = prefix + api.url
  })
  createProdMockServer(mocks)
}
