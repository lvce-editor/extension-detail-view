import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as Dispose from '../src/parts/Dispose/Dispose.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'

test('dispose removes state for given uid', () => {
  const uid = 1
  const state: ExtensionDetailState = {
    selectedTab: '',
    selectedFeature: '',
    sanitizedReadmeHtml: '',
    iconSrc: '',
    name: 'test',
    description: '',
    sizeOnDisk: 0,
    width: 0,
    uri: '',
    selectedFeatureMarkdownDom: '',
    entries: [],
    secondEntries: [],
    categories: [],
    resources: [],
    extension: {},
    baseUrl: '',
    features: [],
    folderSize: 0,
    assetDir: '',
    platform: 0,
  }
  ExtensionDetailStates.set(uid, state, state)

  Dispose.dispose(uid)

  expect(ExtensionDetailStates.get(uid)).toBeUndefined()
})
