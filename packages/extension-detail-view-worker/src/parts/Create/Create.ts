import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStates from '../ExensionDetailStates/ExtensionDetailStates.ts'

export const create = (uid: number, uri: string, width: number, height: number, platform: number): void => {
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
  }
  ExtensionDetailStates.set(uid, state, state)
}
