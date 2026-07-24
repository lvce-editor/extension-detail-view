import { expect, test } from '@jest/globals'
import { getFeatureDetailsCommand } from '../src/parts/GetFeatureDetailsCommands/GetFeatureDetailsCommands.ts'

test('returns no command rows when commands are missing', () => {
  expect(getFeatureDetailsCommand({})).toEqual({
    commands: [],
  })
})
