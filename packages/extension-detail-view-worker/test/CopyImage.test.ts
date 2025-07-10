import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as CopyImage from '../src/parts/CopyImage/CopyImage.ts'

test('returns current state', () => {
  Create.create(1, 'test-uri', 0, 0, 800, 600, 0, '')
  const state = CopyImage.copyImage(1)
  expect(state).toEqual({
    activationEvents: [],
    assetDir: '',
    baseUrl: '',
    builtinExtensionsBadgeEnabled: true,
    categories: [],
    changelogVirtualDom: [],
    commands: [],
    description: '',
    detailsVirtualDom: [],
    displaySize: '',
    entries: [],
    extension: {},
    extensionId: '',
    extensionVersion: '',
    features: [],
    featuresVirtualDom: [],
    folderSize: 0,
    hasColorTheme: false,
    iconSrc: '',
    isBuiltin: false,
    jsonValidation: [],
    name: '',
    platform: 0,
    programmingLanguages: [],
    readmeScrollTop: 0,
    resources: [],
    scrollSource: 0,
    scrollToTopButtonEnabled: false,
    secondEntries: [],
    selectedFeature: '',
    selectedTab: '',
    settings: [],
    settingsButtonEnabled: false,
    showAdditionalDetailsBreakpoint: 600,
    sizeOnDisk: 0,
    sizeValue: 0,
    themesMarkdownDom: [],
    uri: 'test-uri',
    webViews: [],
    width: 800,
  })
})