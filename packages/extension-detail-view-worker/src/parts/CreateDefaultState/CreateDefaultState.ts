import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const createDefaultState = (overrides: Partial<ExtensionDetailState> = {}): ExtensionDetailState => {
  return {
    selectedTab: '',
    selectedFeature: '',
    sanitizedReadmeHtml: '',
    iconSrc: '',
    name: '',
    description: '',
    sizeOnDisk: 0,
    width: 500,
    uri: 'extension-detail://test-extension',
    selectedFeatureMarkdownDom: '',
    entries: [],
    secondEntries: [],
    categories: [],
    resources: [],
    extension: {},
    baseUrl: '',
    features: [],
    folderSize: 0,
    assetDir: '/test/asset/dir',
    platform: 0,
    readmeScrollTop: 0,
    settingsButtonEnabled: false,
    builtinExtensionsBadgeEnabled: true,
    scrollToTopButtonEnabled: false,
    ...overrides,
  }
}
