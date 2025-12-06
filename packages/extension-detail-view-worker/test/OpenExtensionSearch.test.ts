import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as OpenExtensionSearch from '../src/parts/OpenExtensionSearch/OpenExtensionSearch.ts'

test.skip('openExtensionSearch calls RendererWorker.openExtensionSearch and setExtensionsSearchValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Extensions.handleInput': () => {
      /**/
    },
    'SideBar.openViewlet': () => {
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
