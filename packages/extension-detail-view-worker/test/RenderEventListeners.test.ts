import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners returns expected event listeners', () => {
  const result = RenderEventListeners.renderEventListeners()
  expect(result).toBeDefined()
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleMouseEnterEnable,
    params: ['handleMouseEnterEnable'],
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleMouseLeaveEnable,
    params: ['handleMouseLeaveEnable'],
  })
})
