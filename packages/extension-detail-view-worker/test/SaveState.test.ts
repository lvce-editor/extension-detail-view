import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import { get } from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'
import * as SaveState from '../src/parts/SaveState/SaveState.ts'

test('saves state with selected tab and feature', () => {
  Create.create(1, 'test-uri', 0, 0, 800, 600, 0, '')
  const { newState } = get(1)
  const savedState = SaveState.saveState(newState)
  expect(savedState).toEqual({
    selectedTab: '',
    selectedFeature: '',
    readmeScrollTop: 0,
    changelogScrollTop: 0,
  })
})
