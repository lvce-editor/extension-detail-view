import { expect, test } from '@jest/globals'
import * as GetCommandIds from '../src/parts/GetCommandIds/GetCommandIds.ts'

test('getCommandIds', () => {
  const result = GetCommandIds.getCommandIds()
  expect(result).toBeDefined()
})
