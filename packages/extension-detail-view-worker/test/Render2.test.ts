import { test, expect } from '@jest/globals'
import * as createDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'

test('render2 should return render commands', () => {
  const oldState = createDefaultState.createDefaultState()
  const newState = createDefaultState.createDefaultState()
  const uid = 1
  const diffResult = [DiffType.RenderItems]

  ExtensionDetailStates.set(uid, oldState, newState)

  const result = Render2.render2(uid, diffResult)

  expect(Array.isArray(result)).toBe(true)
})
