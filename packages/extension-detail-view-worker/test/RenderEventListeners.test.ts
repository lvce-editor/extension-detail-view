import { expect, test } from '@jest/globals'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners returns expected event listeners', () => {
  const result = RenderEventListeners.renderEventListeners()
  expect(result).toBeDefined()
})
