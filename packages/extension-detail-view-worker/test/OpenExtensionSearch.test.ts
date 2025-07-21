import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as OpenExtensionSearch from '../src/parts/OpenExtensionSearch/OpenExtensionSearch.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('openExtensionSearch calls RendererWorker.openExtensionSearch and setExtensionsSearchValue', async () => {
  let setExtensionsSearchValueCalled = false
  let setExtensionsSearchValueArg: string | undefined
  const invokedMethods: string[] = []

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      invokedMethods.push(method)
      if (method === 'openExtensionSearch') {
        return undefined
      }
      if (method === 'setExtensionsSearchValue') {
        setExtensionsSearchValueCalled = true
        setExtensionsSearchValueArg = args[0]
        return undefined
      }
      if (method === 'Extensions.handleInput') {
        setExtensionsSearchValueCalled = true
        setExtensionsSearchValueArg = args[0]
        return undefined
      }
      if (method === 'SideBar.openViewlet') {
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const searchValue = 'test-search'
  await OpenExtensionSearch.openExtensionSearch(searchValue)

  expect(setExtensionsSearchValueCalled).toBe(true)
  expect(setExtensionsSearchValueArg).toBe(searchValue)
  expect(invokedMethods).toContain('SideBar.openViewlet')
})
