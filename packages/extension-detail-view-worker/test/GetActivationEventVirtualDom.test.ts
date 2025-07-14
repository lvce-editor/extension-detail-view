import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetActivationEventVirtualDom from '../src/parts/GetActivationEventVirtualDom/GetActivationEventVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('activation event virtual dom', () => {
  const event = 'onCommand:workbench.action.openFile'
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
  const event = 'onLanguage:typescript'
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
  const event = ''
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
