import { expect, test } from '@jest/globals'
import type { ExtensionDetailButton } from '../src/parts/GetExtensionDetailButtons/ExtensionDetailButton.ts'
import * as GetExtensionDetailHeaderActionsVirtualDom from '../src/parts/GetExtensionDetailHeaderActionsVirtualDom/GetExtensionDetailHeaderActionsVirtualDom.ts'

const enabledButton: ExtensionDetailButton = {
  enabled: true,
  label: 'Disable',
  name: 'Disable',
  onClick: 'handleClickDisable',
}

test('counts direct children when settings button is enabled', () => {
  const result = GetExtensionDetailHeaderActionsVirtualDom.getExtensionDetailHeaderActionsVirtualDom([enabledButton], true)

  expect(result[0].childCount).toBe(2)
})

test('counts direct children when settings button is disabled', () => {
  const result = GetExtensionDetailHeaderActionsVirtualDom.getExtensionDetailHeaderActionsVirtualDom([enabledButton], false)

  expect(result[0].childCount).toBe(1)
})
