import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as SelectTabDetails from '../src/parts/SelectTabDetails/SelectTabDetails.ts'

test('selectTabDetails sets selectedTab and detailsVirtualDom', async () => {
  const expectedDom = [{ type: 'element', tag: 'h1', children: [] }]
  const mockRendererRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return 'README CONTENT'
    },
  })

  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return 'README CONTENT'
    },
  })

  const mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.render': () => {
      return '<h1>README CONTENT</h1>'
    },
    'Markdown.getVirtualDom': () => {
      return expectedDom
    },
  })

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
  expect(mockRendererRpc.invocations).toEqual([])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations).toEqual([
    ['Markdown.render', expect.any(String), expect.any(Object)],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})
