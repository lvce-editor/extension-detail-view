import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as OpenExtensionSearch from '../src/parts/OpenExtensionSearch/OpenExtensionSearch.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('openExtensionSearch calls RendererWorker.openExtensionSearch and setExtensionsSearchValue', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'openExtensionSearch') {
      return undefined
    }
    if (method === 'setExtensionsSearchValue') {
      return undefined
    }
    if (method === 'Extensions.handleInput') {
      return undefined
    }
    if (method === 'SideBar.openViewlet') {
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const searchValue = 'test-search'
  await OpenExtensionSearch.openExtensionSearch(searchValue)

  expect(mockInvoke).toHaveBeenCalledWith('setExtensionsSearchValue', searchValue)
  expect(mockInvoke).toHaveBeenCalledWith('SideBar.openViewlet')
})
