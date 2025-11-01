import { expect, test } from '@jest/globals'
import * as OpenExtensionSearch from '../src/parts/OpenExtensionSearch/OpenExtensionSearch.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test.skip('openExtensionSearch calls RendererWorker.openExtensionSearch and setExtensionsSearchValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SideBar.openViewlet': () => {
      /**/
    },
    'Extensions.handleInput': () => {
      /**/
    },
  })

  const searchValue = 'test-search'
  await OpenExtensionSearch.openExtensionSearch(searchValue)

  expect(mockRpc.invocations).toEqual([
    ['SideBar.openViewlet', 'Extensions'],
    ['Extensions.handleInput', searchValue],
  ])
})
