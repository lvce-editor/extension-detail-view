import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { selectTabChangelog } from '../src/parts/SelectTabChangelog/SelectTabChangelog.ts'

test('selectTabChangelog should update state with changelog tab and virtual dom', async () => {
  const mockRendererRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readFile') {
        return 'test changelog content'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRendererRpc)

  const mockMarkdownRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Markdown.render') {
        return '<div>test changelog html</div>'
      }
      if (method === 'Markdown.getVirtualDom') {
        return [{ tag: 'div', children: ['test changelog html'] }]
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  MarkdownWorker.set(mockMarkdownRpc)

  const state = createDefaultState()
  const result = await selectTabChangelog(state)

  expect(result.selectedTab).toBe(InputName.Changelog)
  expect(result.changelogVirtualDom).toBeDefined()
  expect(result.changelogVirtualDom).not.toBe(state.changelogVirtualDom)
})
