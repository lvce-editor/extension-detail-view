import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: ExtensionDetailState = {
<<<<<<< HEAD
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
    themesMarkdownDom: [],
    extension: {},
    baseUrl: '',
    features: [],
    folderSize: 0,
=======
>>>>>>> origin/main
    assetDir: assetDir || '',
    baseUrl: '',
    builtinExtensionsBadgeEnabled: true,
    categories: [],
    changelogVirtualDom: [],
    description: '',
    detailsVirtualDom: [],
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
    sanitizedReadmeHtml: '',
    scrollToTopButtonEnabled: false,
    secondEntries: [],
    selectedFeature: '',
    selectedFeatureMarkdownDom: '',
    selectedTab: '',
    settingsButtonEnabled: false,
    showAdditionalDetailsBreakpoint: 600,
    sizeOnDisk: 0,
    uri,
    width,
  }
  ExtensionDetailStates.set(uid, state, state)
}
