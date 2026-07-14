import { afterEach, expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as createDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FileSystemWorker from '../src/parts/FileSystemWorker/FileSystemWorker.ts'
import * as GithubApiRequest from '../src/parts/GithubApiRequest/GithubApiRequest.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'
import * as SelectTabChangelog from '../src/parts/SelectTabChangelog/SelectTabChangelog.ts'

afterEach(() => {
  GithubApiRequest.resetGithubApiMock()
})

test('selectTabChangelog should update state with changelog content', async () => {
  const state = {
    ...createDefaultState.createDefaultState(),
    extensionUri: 'https://lvce-editor.github.io/extension-detail-view/hash/extensions/test.extension',
    languages: [{ extensions: ['.js'], id: 'javascript', tokenize: '/extensions/javascript/tokenize.js' }],
  }
  const changelogContent = '# Changelog\n\n## Version 1.0.0\n- Initial release'
  const renderedHtml = '<h1>Changelog</h1><h2>Version 1.0.0</h2><ul><li>Initial release</li></ul>'
  const mockDom = [{ childCount: 1, type: VirtualDomElements.Div }]

  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return mockDom
    },
    'Markdown.render': () => {
      return renderedHtml
    },
  })

  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      return changelogContent
    },
  })

  const result = await SelectTabChangelog.selectTabChangelog(state)

  expect(result.selectedTab).toBe(InputName.Changelog)
  expect(result.changelogVirtualDom).toHaveLength(3)
  expect(result.changelogVirtualDom[0]).toMatchObject({ childCount: 2, type: VirtualDomElements.Div })
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', 'https://lvce-editor.github.io/extension-detail-view/hash/extensions/test.extension/CHANGELOG.md'],
  ])
  expect(mockMarkdownRpc.invocations.length).toBeGreaterThan(0)
  expect(result.tabs.every((tab) => tab.selected === (tab.name === InputName.Changelog))).toBe(true)
  expect(mockMarkdownRpc.invocations).toEqual([
    [
      'Markdown.render',
      changelogContent,
      {
        baseUrl: '',
        languages: [{ extensions: ['.js'], id: 'javascript', tokenize: '/extensions/javascript/tokenize.js' }],
        linksExternal: true,
        locationProtocol: '',
      },
    ],
    ['Markdown.getVirtualDom', expect.any(String)],
  ])
})

test('selectTabChangelog renders GitHub releases without reading a local changelog', async () => {
  const release = {
    body: '**Important** fix',
    html_url: 'https://github.com/test-owner/test-repository/releases/tag/v1',
    name: 'Version 1',
    published_at: '2026-01-01T00:00:00Z',
    tag_name: 'v1',
  }
  GithubApiRequest.mockGithubApi({ body: [release], type: 'success' })
  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => [{ childCount: 0, type: VirtualDomElements.Div }],
    'Markdown.render': () => '<h1>Version 1</h1>',
  })
  const state = {
    ...createDefaultState.createDefaultState(),
    extension: { repository: 'https://github.com/test-owner/test-repository' },
  }

  const result = await SelectTabChangelog.selectTabChangelog(state)

  expect(result.selectedTab).toBe(InputName.Changelog)
  expect(mockMarkdownRpc.invocations[0]).toEqual([
    'Markdown.render',
    expect.stringContaining('**Important** fix'),
    expect.objectContaining({ baseUrl: 'https://github.com/test-owner/test-repository/blob/HEAD/' }),
  ])
})

test('selectTabChangelog renders a friendly GitHub error', async () => {
  GithubApiRequest.mockGithubApi({ type: 'network-error' })
  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => [{ childCount: 0, type: VirtualDomElements.Div }],
    'Markdown.render': () => '<h1>Changelog</h1>',
  })
  const state = {
    ...createDefaultState.createDefaultState(),
    extension: { repository: 'https://github.com/test-owner/test-repository' },
  }

  await SelectTabChangelog.selectTabChangelog(state)

  expect(mockMarkdownRpc.invocations[0]).toEqual(['Markdown.render', expect.stringContaining('GitHub is not reachable'), expect.any(Object)])
})

test('selectTabChangelog handles 5000 GitHub releases with a responsive display limit', async () => {
  GithubApiRequest.mockGithubApi({ releaseCount: 5000, type: 'generated' })
  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => [{ childCount: 1, type: VirtualDomElements.Div }],
    'Markdown.render': () => '<h1>Releases</h1>',
  })
  const state = {
    ...createDefaultState.createDefaultState(),
    extension: { repository: 'https://github.com/test-owner/test-repository' },
  }

  await SelectTabChangelog.selectTabChangelog(state)

  const renderInvocations = mockMarkdownRpc.invocations.filter(([command]) => command === 'Markdown.render')
  expect(renderInvocations).toHaveLength(1)
  expect(renderInvocations[0][1]).toContain('Showing the newest 100 GitHub releases')
  expect(renderInvocations[0][1]).toContain('Version 5000')
  expect(renderInvocations.at(-1)?.[1]).toContain('Version 4901')
})
