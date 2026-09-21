import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as SelectTabContents from '../src/parts/SelectTabContents/SelectTabContents.ts'

test('selects the contents tab when enabled', async () => {
  const state = {
    ...createDefaultState(),
    contentsEnabled: true,
    tabs: [{ enabled: true, label: 'Contents', name: InputName.Contents, selected: false }],
  }
  const result = await SelectTabContents.selectTabContents(state)
  expect(result.selectedTab).toBe(InputName.Contents)
  expect(result.tabs[0].selected).toBe(true)
})

test('does nothing when contents are disabled', async () => {
  const state = createDefaultState()
  await expect(SelectTabContents.selectTabContents(state)).resolves.toBe(state)
})
