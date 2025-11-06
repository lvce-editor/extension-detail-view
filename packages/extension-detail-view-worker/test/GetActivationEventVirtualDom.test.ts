import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivationEntry } from '../src/parts/ActivationEntry/ActivationEntry.ts'
import * as GetActivationEventVirtualDom from '../src/parts/GetActivationEventVirtualDom/GetActivationEventVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('activation event virtual dom', () => {
  const event: ActivationEntry = {
    stringValue: 'onCommand:workbench.action.openFile',
    isValid: true,
    errorMessage: '',
  }
  expect(GetActivationEventVirtualDom.getActivationEventVirtualDom(event)).toEqual([
    {
      type: VirtualDomElements.Li,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text('onCommand:workbench.action.openFile'),
  ])
})

test('activation event virtual dom with different event', () => {
  const event: ActivationEntry = {
    stringValue: 'onLanguage:typescript',
    errorMessage: '',
    isValid: true,
  }
  expect(GetActivationEventVirtualDom.getActivationEventVirtualDom(event)).toEqual([
    {
      type: VirtualDomElements.Li,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text('onLanguage:typescript'),
  ])
})

test('activation event virtual dom with empty event', () => {
  const event: ActivationEntry = {
    errorMessage: '',
    isValid: true,
    stringValue: '',
  }
  expect(GetActivationEventVirtualDom.getActivationEventVirtualDom(event)).toEqual([
    {
      type: VirtualDomElements.Li,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text(''),
  ])
})

test('activation event virtual dom with invalid event', () => {
  const event: ActivationEntry = {
    stringValue: 'invalid:event',
    isValid: false,
    errorMessage: 'Invalid activation event format',
  }
  expect(GetActivationEventVirtualDom.getActivationEventVirtualDom(event)).toEqual([
    {
      type: VirtualDomElements.Li,
      childCount: 1,
      title: 'Invalid activation event format',
      className: 'ListItem ListItemInvalid',
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text('invalid:event'),
  ])
})
