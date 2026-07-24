import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
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
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleHeaderContextMenu,
    params: ['handleHeaderContextMenu'],
    preventDefault: true,
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleClickSettings,
    params: ['handleClickSettings', EventExpression.ClientX, EventExpression.ClientY],
  })
})
