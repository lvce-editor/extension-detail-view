import { test, expect } from '@jest/globals'
import * as FeatureCommandsDetails from '../src/parts/FeatureCommandsDetails/FeatureCommandsDetails.ts'

test('getCommandsDetails should return command details', async () => {
  const extension = {
    commands: [
      { command: 'extension.command1', title: 'Command 1' },
      { command: 'extension.command2', title: 'Command 2' },
    ],
  }

  const result = await FeatureCommandsDetails.getCommandsDetails(extension)

  expect(result).toHaveProperty('commands')
  expect(Array.isArray(result.commands)).toBe(true)
  expect(result.commands).toHaveLength(2)
})

test('getCommandsDetails should handle empty commands', async () => {
  const extension = {}

  const result = await FeatureCommandsDetails.getCommandsDetails(extension)

  expect(result).toEqual({
    commands: [],
  })
})
