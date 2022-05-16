import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import table from '../../mock/table'
import user from '../../mock/user'

const mocks = [...table, ...user]
export function setupProdMockServer() {
  const baseURL = import.meta.env.VITE_APP_BASE_API
  mocks.forEach(api => {
    // add mock prefix
    if (api.url) api.url = baseURL + api.url
  })
  createProdMockServer(mocks)
}
