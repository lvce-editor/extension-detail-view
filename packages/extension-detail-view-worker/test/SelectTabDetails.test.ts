import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as SelectTabDetails from '../src/parts/SelectTabDetails/SelectTabDetails.ts'

test('selectTabDetails sets selectedTab and detailsVirtualDom', async () => {
  const expectedDom = [{ type: 'element', tag: 'h1', children: [] }]
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'FileSystem.readFile') {
        return 'README CONTENT'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockMarkdownRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Markdown.render') {
        return '<h1>README CONTENT</h1>'
      }
      if (method === 'Markdown.getVirtualDom') {
        return expectedDom
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  MarkdownWorker.set(mockMarkdownRpc)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      id: 'test-extension',
      name: 'Test Extension',
      version: '1.0.0',
      path: '/test/path',
    },
    baseUrl: '/test/baseUrl',
    platform: 0,
  }

  const result = await SelectTabDetails.selectTabDetails(state)

  expect(result.selectedTab).toBe(InputName.Details)
  expect(result.detailsVirtualDom).toEqual(expectedDom)
})
