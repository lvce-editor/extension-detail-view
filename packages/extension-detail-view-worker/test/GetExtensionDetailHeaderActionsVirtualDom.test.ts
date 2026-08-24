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

test('renders enablement actions with a menu as one split-button child', () => {
  const splitButton: ExtensionDetailButton = {
    enabled: true,
    label: 'Enable',
    menuId: 4093,
    menuOnClick: 25,
    name: 'Enable',
    onClick: 3,
    onMouseEnter: 20,
    onMouseLeave: 21,
  }

  const result = GetExtensionDetailHeaderActionsVirtualDom.getExtensionDetailHeaderActionsVirtualDom([splitButton], false)

  expect(result[0].childCount).toBe(1)
  expect(result).toEqual([
    { childCount: 1, className: 'ExtensionDetailHeaderActions', type: 4 },
    { childCount: 2, className: 'ExtensionEnablementSplitButton', type: 4 },
    {
      childCount: 1,
      className: 'Button ButtonPrimary ExtensionEnablementSplitButtonPrimary',
      name: 'Enable',
      onClick: 3,
      onMouseEnter: 20,
      onMouseLeave: 21,
      type: 1,
    },
    { childCount: 0, text: 'Enable', type: 12 },
    {
      ariaLabel: 'Enable options',
      childCount: 1,
      className: 'Button ButtonPrimary ExtensionEnablementSplitButtonDropDown',
      name: 'EnableOptions',
      onClick: 25,
      title: 'Enable options',
      type: 1,
    },
    { childCount: 0, className: 'MaskIcon MaskIconChevronDown', type: 4 },
  ])
})

test('renders disable split-button labels and events', () => {
  const splitButton: ExtensionDetailButton = {
    enabled: true,
    label: 'Disable',
    menuId: 4094,
    menuOnClick: 26,
    name: 'Disable',
    onClick: 2,
  }

  const result = GetExtensionDetailHeaderActionsVirtualDom.getExtensionDetailHeaderActionsVirtualDom([splitButton], false)

  expect(result).toContainEqual({
    ariaLabel: 'Disable options',
    childCount: 1,
    className: 'Button ButtonPrimary ExtensionEnablementSplitButtonDropDown',
    name: 'DisableOptions',
    onClick: 26,
    title: 'Disable options',
    type: 1,
  })
})
