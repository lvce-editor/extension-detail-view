import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FeatureCommandsVirtualDom from '../src/parts/FeatureCommandsVirtualDom/FeatureCommandsVirtualDom.ts'
import * as GetFeatureCommandsVirtualDom from '../src/parts/GetFeatureCommandsVirtualDom/GetFeatureCommandsVirtualDom.ts'

test('returns virtual dom for empty commands', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    commands: [],
  }

  const result = FeatureCommandsVirtualDom.getCommandsVirtualDom(state)

  const expected = GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom([])
  expect(result).toEqual(expected)
})

test('returns virtual dom for commands with entries', () => {
  const commands = [
    [
      { type: 1, value: 'command1' },
      { type: 2, value: 'Command 1' },
      { type: 2, value: 'Description 1' },
    ],
  ]
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    commands,
  }

  const result = FeatureCommandsVirtualDom.getCommandsVirtualDom(state)

  const expected = GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom(commands)
  expect(result).toEqual(expected)
})

test('returns virtual dom for multiple commands', () => {
  const commands = [
    [
      { type: 1, value: 'command1' },
      { type: 2, value: 'Command 1' },
      { type: 2, value: 'Description 1' },
    ],
    [
      { type: 1, value: 'command2' },
      { type: 2, value: 'Command 2' },
      { type: 2, value: 'Description 2' },
    ],
  ]
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    commands,
  }

  const result = FeatureCommandsVirtualDom.getCommandsVirtualDom(state)

  const expected = GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom(commands)
  expect(result).toEqual(expected)
})
