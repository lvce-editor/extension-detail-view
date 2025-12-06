import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivationEntry } from '../src/parts/ActivationEntry/ActivationEntry.ts'
import * as GetActivationEventVirtualDom from '../src/parts/GetActivationEventVirtualDom/GetActivationEventVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('activation event virtual dom', () => {
  const event: ActivationEntry = {
    errorMessage: '',
    isValid: true,
    stringValue: 'onCommand:workbench.action.openFile',
  }
  expect(GetActivationEventVirtualDom.getActivationEventVirtualDom(event)).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text('onCommand:workbench.action.openFile'),
  ])
})

test('activation event virtual dom with different event', () => {
  const event: ActivationEntry = {
    errorMessage: '',
    isValid: true,
    stringValue: 'onLanguage:typescript',
  }
  expect(GetActivationEventVirtualDom.getActivationEventVirtualDom(event)).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
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
      childCount: 1,
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text(''),
  ])
})

test('activation event virtual dom with invalid event', () => {
  const event: ActivationEntry = {
    errorMessage: 'Invalid activation event format',
    isValid: false,
    stringValue: 'invalid:event',
  }
  expect(GetActivationEventVirtualDom.getActivationEventVirtualDom(event)).toEqual([
    {
      childCount: 1,
      className: 'ListItem ListItemInvalid',
      title: 'Invalid activation event format',
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text('invalid:event'),
  ])
})
