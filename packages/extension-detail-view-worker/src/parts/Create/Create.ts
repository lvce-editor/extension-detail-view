import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: ExtensionDetailState = {
    description: '',
    iconSrc: '',
    selectedFeature: '',
    name: '',
    sanitizedReadmeHtml: '',
    selectedTab: '',
    sizeOnDisk: 0,
    width,
    uri,
    entries: [],
    secondEntries: [],
    categories: [],
    resources: [],
    selectedFeatureMarkdownDom: '',
    extension: {},
    baseUrl: '',
    features: [],
    folderSize: 0,
    assetDir: assetDir || '',
    platform,
    readmeScrollTop: 0,
    settingsButtonEnabled: false,
    builtinExtensionsBadgeEnabled: true,
    scrollToTopButtonEnabled: false,
    // Initialize viewmodel properties as empty arrays
    detailsVirtualDom: [],
    featuresVirtualDom: [],
    changelogVirtualDom: [],
  }
  ExtensionDetailStates.set(uid, state, state)
}
