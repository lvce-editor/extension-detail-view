import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { selectTabSecurity } from '../src/parts/SelectTabSecurity/SelectTabSecurity.ts'

test('selects security and deselects the other tabs', async () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    tabs: [
      { enabled: true, label: 'Details', name: InputName.Details, selected: true },
      { enabled: true, label: 'Security', name: InputName.Security, selected: false },
    ],
  }

  const result = await selectTabSecurity(state)

  expect(result.selectedTab).toBe(InputName.Security)
  expect(result.tabs).toEqual([
    { enabled: true, label: 'Details', name: InputName.Details, selected: false },
    { enabled: true, label: 'Security', name: InputName.Security, selected: true },
  ])
})
