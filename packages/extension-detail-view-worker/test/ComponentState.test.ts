import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'
import { getComponentState } from '../src/parts/GetComponentState/GetComponentState.ts'
import { setComponentState } from '../src/parts/SetComponentState/SetComponentState.ts'

test('gets and sets the live component state', async () => {
  const uid = 101
  const oldState = { ...createDefaultState(), name: 'Before', uid }
  const newState = { ...oldState, name: 'After' }
  ExtensionDetailStates.set(uid, oldState, oldState)

  expect(getComponentState(uid)).toBe(oldState)
  await setComponentState(uid, newState)

  expect(ExtensionDetailStates.get(uid)).toEqual({ newState, oldState, scheduledState: newState })
})

test('rejects an invalid live component state', async () => {
  const uid = 102
  const state = { ...createDefaultState(), uid }
  ExtensionDetailStates.set(uid, state, state)

  await expect(setComponentState(uid, { ...state, uid: 103 })).rejects.toThrow('Extension Detail state uid must remain 102')
  await expect(setComponentState(uid, [] as unknown)).rejects.toThrow('Extension Detail state must be an object')
})
