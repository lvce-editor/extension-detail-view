import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as AssetDir from '../AssetDir/AssetDir.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const create = (uid: number, uri: string, width: number, height: number, platform: number, assetDir: string): void => {
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
    assetDir: assetDir || AssetDir.assetDir,
    platform,
  }
  ExtensionDetailStates.set(uid, state, state)
}
