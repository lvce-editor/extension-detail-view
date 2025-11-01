import { test, expect } from '@jest/globals'
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

  const mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return mockDom
    },
    'Markdown.render': () => {
      return renderedHtml
    },
  })

  const mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return changelogContent
    },
  })

  const result = await SelectTabChangelog.selectTabChangelog(state)

  expect(result.selectedTab).toBe(InputName.Changelog)
  expect(result.changelogVirtualDom).toStrictEqual(mockDom)
  expect(result.tabs.every((tab) => tab.selected === (tab.name === InputName.Changelog))).toBe(true)
  expect(mockFileSystemRpc.invocations).toEqual([['FileSystem.readFile', expect.any(String)]])
  expect(mockMarkdownRpc.invocations).toEqual([
    ['Markdown.render', expect.any(String), expect.any(Object)],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})
