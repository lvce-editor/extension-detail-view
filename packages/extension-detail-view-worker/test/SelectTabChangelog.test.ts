import { afterEach, expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
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
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [{ extensions: ['.js'], id: 'javascript', tokenize: '/extensions/javascript/tokenize.js' }],
  })

  const state = {
    ...createDefaultState.createDefaultState(),
    extensionUri: 'https://lvce-editor.github.io/extension-detail-view/hash/extensions/test.extension',
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

  expect(result).not.toHaveProperty('languages')
  expect(mockExtensionManagementRpc.invocations).toContainEqual(['Extensions.getLanguages', state.platform, state.assetDir])
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

test('selectTabChangelog shows a loading state before reading uncached content', async () => {
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [{ extensions: ['.js'], id: 'javascript', tokenize: '/extensions/javascript/tokenize.js' }],
  })
  const changelogRead = Promise.withResolvers<string>()
  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => changelogRead.promise,
  })
  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => [{ childCount: 0, type: VirtualDomElements.Div }],
    'Markdown.render': () => '<h1>Changelog</h1>',
  })
  let currentState: ExtensionDetailState = {
    ...createDefaultState.createDefaultState(),
    changelogVirtualDom: [
      { childCount: 1, type: VirtualDomElements.Div },
      { childCount: 0, text: 'Loading…', type: VirtualDomElements.Text },
    ],
    extensionUri: 'https://lvce-editor.github.io/extension-detail-view/hash/extensions/test.extension',
    tabs: [{ enabled: true, label: 'Details', name: InputName.Details, selected: true }],
  }
  const context = {
    getState: (): ExtensionDetailState => currentState,
    updateState: async (updater: (state: ExtensionDetailState) => ExtensionDetailState): Promise<ExtensionDetailState> => {
      currentState = updater(currentState)
      return currentState
    },
  }

  const loading = SelectTabChangelog.selectTabChangelogWithContext(context)
  await Promise.resolve()

  expect(currentState.selectedTab).toBe(InputName.Changelog)
  expect(currentState.tabs[0].selected).toBe(false)
  expect(currentState.changelogVirtualDom).toContainEqual({ childCount: 0, text: 'Loading…', type: VirtualDomElements.Text })
  await new Promise((resolve) => setTimeout(resolve, 0))
  expect(mockFileSystemRpc.invocations).toEqual([
    ['FileSystem.readFile', 'https://lvce-editor.github.io/extension-detail-view/hash/extensions/test.extension/CHANGELOG.md'],
  ])
  expect(mockExtensionManagementRpc.invocations).toContainEqual(['Extensions.getLanguages', currentState.platform, currentState.assetDir])
  expect(mockMarkdownRpc.invocations).toHaveLength(0)

  changelogRead.resolve('# Changelog')
  await loading

  expect(currentState.changelogVirtualDom).not.toContainEqual(expect.objectContaining({ text: 'Loading…' }))
  expect(currentState.selectedTab).toBe(InputName.Changelog)
  expect(mockMarkdownRpc.invocations).toHaveLength(2)
})

test('selectTabChangelog does not restore the changelog tab after switching away while it loads', async () => {
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [{ extensions: ['.js'], id: 'javascript', tokenize: '/extensions/javascript/tokenize.js' }],
  })
  const changelogRead = Promise.withResolvers<string>()
  using mockFileSystemRpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => changelogRead.promise,
  })
  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => [{ childCount: 0, type: VirtualDomElements.Div }],
    'Markdown.render': () => '<h1>Changelog</h1>',
  })
  let currentState: ExtensionDetailState = {
    ...createDefaultState.createDefaultState(),
    extensionUri: 'https://lvce-editor.github.io/extension-detail-view/hash/extensions/test.extension',
    tabs: [{ enabled: true, label: 'Details', name: InputName.Details, selected: true }],
  }
  const context = {
    getState: (): ExtensionDetailState => currentState,
    updateState: async (updater: (state: ExtensionDetailState) => ExtensionDetailState): Promise<ExtensionDetailState> => {
      currentState = updater(currentState)
      return currentState
    },
  }

  const loading = SelectTabChangelog.selectTabChangelogWithContext(context)
  await Promise.resolve()
  currentState = { ...currentState, selectedTab: InputName.Details }
  changelogRead.resolve('# Changelog')
  await loading

  expect(currentState.selectedTab).toBe(InputName.Details)
  expect(currentState.changelogVirtualDom).toContainEqual({ childCount: 0, text: 'Loading…', type: VirtualDomElements.Text })
  expect(mockExtensionManagementRpc.invocations).toContainEqual(['Extensions.getLanguages', currentState.platform, currentState.assetDir])
  expect(mockFileSystemRpc.invocations).toHaveLength(1)
  expect(mockMarkdownRpc.invocations).toHaveLength(2)
})

test('selectTabChangelog immediately reuses content already loaded in the view state', async () => {
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => {
      throw new Error('unexpected language lookup')
    },
  })
  let currentState: ExtensionDetailState = {
    ...createDefaultState.createDefaultState(),
    changelogVirtualDom: [
      { childCount: 1, type: VirtualDomElements.Div },
      { childCount: 0, text: 'Cached changelog', type: VirtualDomElements.Text },
    ],
    selectedTab: InputName.Details,
    tabs: [{ enabled: true, label: 'Changelog', name: InputName.Changelog, selected: false }],
  }
  const context = {
    getState: (): ExtensionDetailState => currentState,
    updateState: async (updater: (state: ExtensionDetailState) => ExtensionDetailState): Promise<ExtensionDetailState> => {
      currentState = updater(currentState)
      return currentState
    },
  }

  await SelectTabChangelog.selectTabChangelogWithContext(context)

  expect(currentState.selectedTab).toBe(InputName.Changelog)
  expect(currentState.changelogVirtualDom[1].text).toBe('Cached changelog')
  expect(mockExtensionManagementRpc.invocations).toEqual([])
})

test('selectTabChangelog does not reload content when the selected changelog is already populated', async () => {
  using mockExtensionManagementRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => {
      throw new Error('unexpected language lookup')
    },
  })
  const state: ExtensionDetailState = {
    ...createDefaultState.createDefaultState(),
    changelogVirtualDom: [
      { childCount: 1, type: VirtualDomElements.Div },
      { childCount: 0, text: 'Loaded changelog', type: VirtualDomElements.Text },
    ],
    selectedTab: InputName.Changelog,
  }
  const context = {
    getState: (): ExtensionDetailState => state,
    updateState: async (): Promise<ExtensionDetailState> => {
      throw new Error('unexpected state update')
    },
  }

  await SelectTabChangelog.selectTabChangelogWithContext(context)

  expect(mockExtensionManagementRpc.invocations).toEqual([])
})

test('selectTabChangelog renders GitHub releases without reading a local changelog', async () => {
  const issueUrl = 'https://github.com/test-owner/test-repository/pull/82'
  const release = {
    assets: [],
    body: `**Important** fix in ${issueUrl}`,
    html_url: 'https://github.com/test-owner/test-repository/releases/tag/v1',
    name: 'Version 1',
    published_at: '2026-01-01T00:00:00Z',
    tag_name: 'v1',
  }
  GithubApiRequest.mockGithubApi({ body: [release], type: 'success' })
  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => [{ childCount: 0, type: VirtualDomElements.Div }],
    'Markdown.render': () => `<h1>Version 1</h1><a href="${issueUrl}">${issueUrl}</a>`,
  })
  const state = {
    ...createDefaultState.createDefaultState(),
    extension: { repository: 'https://github.com/test-owner/test-repository' },
  }

  const result = await SelectTabChangelog.selectTabChangelog(state)

  expect(result.selectedTab).toBe(InputName.Changelog)
  expect(mockMarkdownRpc.invocations[0]).toEqual([
    'Markdown.render',
    expect.stringContaining(`**Important** fix in ${issueUrl}`),
    expect.objectContaining({ baseUrl: 'https://github.com/test-owner/test-repository/blob/HEAD/' }),
  ])
  expect(mockMarkdownRpc.invocations[1]).toEqual(['Markdown.getVirtualDom', `<h1>Version 1</h1><a href="${issueUrl}">#82</a>`])
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

test('selectTabChangelog shows a generic message for unexpected rendering errors', async () => {
  GithubApiRequest.mockGithubApi({ body: [], type: 'success' })
  let renderCount = 0
  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => [{ childCount: 0, type: VirtualDomElements.Div }],
    'Markdown.render': () => {
      renderCount++
      if (renderCount === 1) {
        throw new Error('unexpected render failure')
      }
      return '<h1>Changelog</h1>'
    },
  })
  const state = {
    ...createDefaultState.createDefaultState(),
    extension: { repository: 'https://github.com/test-owner/test-repository' },
  }

  await SelectTabChangelog.selectTabChangelog(state)

  expect(mockMarkdownRpc.invocations[0][1]).toContain('No GitHub releases were found')
  expect(mockMarkdownRpc.invocations[1][1]).toContain('GitHub releases could not be loaded. Please try again later.')
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

test('selectTabChangelog renders an empty GitHub release list', async () => {
  GithubApiRequest.mockGithubApi({ releaseCount: 0, type: 'generated' })
  using mockMarkdownRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => [{ childCount: 0, type: VirtualDomElements.Div }],
    'Markdown.render': () => '<h1>Releases</h1>',
  })
  const state = {
    ...createDefaultState.createDefaultState(),
    extension: { repository: 'https://github.com/test-owner/test-repository' },
  }

  await SelectTabChangelog.selectTabChangelog(state)

  expect(mockMarkdownRpc.invocations).toHaveLength(2)
  expect(mockMarkdownRpc.invocations[0][1]).not.toContain('Showing the newest')
})
