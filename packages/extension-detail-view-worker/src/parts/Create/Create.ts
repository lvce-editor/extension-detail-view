import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: ExtensionDetailState = {
    assetDir: assetDir || '',
    baseUrl: '',
    builtinExtensionsBadgeEnabled: true,
    categories: [],
    changelogVirtualDom: [],
    description: '',
    detailsVirtualDom: [],
    displaySize: '',
    entries: [],
    extension: {},
    features: [],
    featuresVirtualDom: [],
    folderSize: 0,
    iconSrc: '',
    name: '',
    platform,
    readmeScrollTop: 0,
    resources: [],
    scrollToTopButtonEnabled: false,
    secondEntries: [],
    selectedFeature: '',
    themesMarkdownDom: [],
    selectedTab: '',
    settingsButtonEnabled: false,
    showAdditionalDetailsBreakpoint: 600,
    sizeOnDisk: 0,
    uri,
    width,
  }
  ExtensionDetailStates.set(uid, state, state)
}
