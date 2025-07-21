import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as OpenExtensionSearch from '../src/parts/OpenExtensionSearch/OpenExtensionSearch.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('openExtensionSearch calls RendererWorker.openExtensionSearch and setExtensionsSearchValue', async () => {
  const setExtensionsSearchValueMock = jest.fn()
  const openExtensionSearchMock = jest.fn()
  const openViewletMock = jest.fn()

  const mockInvoke = (method: string, ...args: readonly any[]) => {
    if (method === 'openExtensionSearch') {
      openExtensionSearchMock(...args)
      return undefined
    }
    if (method === 'setExtensionsSearchValue') {
      setExtensionsSearchValueMock(...args)
      return undefined
    }
    if (method === 'Extensions.handleInput') {
      setExtensionsSearchValueMock(...args)
      return undefined
    }
    if (method === 'SideBar.openViewlet') {
      openViewletMock(...args)
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  }

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const searchValue = 'test-search'
  await OpenExtensionSearch.openExtensionSearch(searchValue)

  expect(setExtensionsSearchValueMock).toHaveBeenCalledWith(searchValue)
  expect(openViewletMock).toHaveBeenCalled()
})
