import { expect, test } from '@jest/globals'
import { getKeyBindings } from '../src/parts/GetKeyBindings/GetKeyBindings.ts'

test('returns key bindings for extension detail navigation', () => {
  const keyBindings = getKeyBindings()
  expect(keyBindings).toBeDefined()
})
