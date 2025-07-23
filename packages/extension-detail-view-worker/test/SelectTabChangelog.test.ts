import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as createDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'
import * as SelectTabChangelog from '../src/parts/SelectTabChangelog/SelectTabChangelog.ts'

test('selectTabChangelog should update state with changelog content', async () => {
  const state = createDefaultState.createDefaultState()
  const changelogContent = '# Changelog\n\n## Version 1.0.0\n- Initial release'
  const renderedHtml = '<h1>Changelog</h1><h2>Version 1.0.0</h2><ul><li>Initial release</li></ul>'
  const mockDom = [{ type: 1, childCount: 1 }]

  const mockMarkdownRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Markdown.getVirtualDom') {
        return mockDom
      }
      if (method === 'Markdown.render') {
        return renderedHtml
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  MarkdownWorker.set(mockMarkdownRpc)

  const mockFileSystemRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readFile') {
        return changelogContent
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  FileSystemWorker.set(mockFileSystemRpc)

  const result = await SelectTabChangelog.selectTabChangelog(state)

  expect(result.selectedTab).toBe(InputName.Changelog)
  expect(result.changelogVirtualDom).toStrictEqual(mockDom)
  expect(result.tabs.every((tab) => tab.selected === (tab.name === InputName.Changelog))).toBe(true)
})
