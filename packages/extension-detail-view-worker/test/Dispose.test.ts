import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as Dispose from '../src/parts/Dispose/Dispose.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'

test('dispose removes state for given uid', () => {
  const uid = 1
  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }
  ExtensionDetailStates.set(uid, state, state)

  Dispose.dispose(uid)

  expect(ExtensionDetailStates.get(uid)).toBeUndefined()
})
