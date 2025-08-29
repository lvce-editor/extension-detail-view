import { test, expect } from '@jest/globals'
import { create } from '../src/parts/Create/Create.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'

test('create initializes extension detail state', () => {
  const uid = 123
  const uri = 'extension-detail://test-extension'
  const x = 100
  const y = 200
  const width = 500
  const height = 600
  const platform = 1
  const assetDir = '/test/assets'

  create(uid, uri, x, y, width, height, platform, assetDir)

  const state = ExtensionDetailStates.get(uid)
  expect(state).toBeDefined()
})
