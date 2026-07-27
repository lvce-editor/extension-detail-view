import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'
import { applyLatestResponsiveLayout } from '../src/parts/LoadContent2/LoadContent2.ts'
import { resize } from '../src/parts/Resize/Resize.ts'

test('applyLatestResponsiveLayout preserves a newer responsive layout when loading finishes', () => {
  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    uid: 1,
    width: 400,
  }
  ExtensionDetailStates.set(initialState.uid, initialState, initialState)

  const resizedState = resize(initialState, { height: 600, width: 800, x: 0, y: 0 })
  ExtensionDetailStates.set(initialState.uid, initialState, resizedState)
  const result = applyLatestResponsiveLayout({
    ...initialState,
    name: 'Loaded Extension',
  })

  expect(result).toMatchObject({
    name: 'Loaded Extension',
    paddingLeft: 10,
    paddingRight: 10,
    showSideBar: true,
    sideBarWidth: 335,
    width: 800,
  })
})
