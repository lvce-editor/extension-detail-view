import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'
import * as SelectTabDetails from '../src/parts/SelectTabDetails/SelectTabDetails.ts'

test('selectTabDetails sets selectedTab and detailsVirtualDom', async () => {
  const expectedDom = [{ children: [], tag: 'h1', type: 'element' }]
  using mockRendererRpc = RendererWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return 'README CONTENT'
    },
  })

  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return 'README CONTENT'
    },
  })

  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return expectedDom
    },
    'Markdown.render': () => {
      return '<h1>README CONTENT</h1>'
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    baseUrl: '/test/baseUrl',
    extension: {
      id: 'test-extension',
      name: 'Test Extension',
      path: '/test/path',
      version: '1.0.0',
    },
    languages: [{ extensions: ['.js'], id: 'javascript', tokenize: '/extensions/javascript/tokenize.js' }],
    platform: 0,
  }

  const result = await SelectTabDetails.selectTabDetails(state)

  expect(result.selectedTab).toBe(InputName.Details)
  expect(result.detailsVirtualDom).toEqual(expectedDom)
  expect(mockRendererRpc.invocations).toEqual([])
  expect(mockFileSystemRpc.invocations.length).toBeGreaterThan(0)
  expect(mockMarkdownRpc.invocations).toEqual([
    [
      'Markdown.render',
      'README CONTENT',
      {
        baseUrl: '/test/baseUrl',
        languages: [{ extensions: ['.js'], id: 'javascript', tokenize: '/extensions/javascript/tokenize.js' }],
        linksExternal: true,
        locationProtocol: '',
      },
    ],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})
