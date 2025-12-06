import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivationEntry } from '../src/parts/ActivationEntry/ActivationEntry.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFeatureActivationEventsVirtualDom from '../src/parts/GetFeatureActivationEventsVirtualDom/GetFeatureActivationEventsVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('feature activation events virtual dom with events', () => {
  const activationEvents: readonly ActivationEntry[] = [
    {
      errorMessage: '',
      isValid: true,
      stringValue: 'onCommand:workbench.action.openFile',
    },
    {
      errorMessage: '',
      isValid: true,
      stringValue: 'onLanguage:typescript',
    },
    {
      errorMessage: '',
      isValid: true,
      stringValue: 'onView:explorer',
    },
  ]
  expect(GetFeatureActivationEventsVirtualDom.getFeatureActivationEventsVirtualDom(activationEvents)).toEqual([
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text('Activation Events'),
    {
      childCount: 3,
      type: VirtualDomElements.Ul,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text('onCommand:workbench.action.openFile'),
    {
      childCount: 1,
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text('onLanguage:typescript'),
    {
      childCount: 1,
      type: VirtualDomElements.Li,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text('onView:explorer'),
  ])
})

test('feature activation events virtual dom with empty events', () => {
  const activationEvents: readonly ActivationEntry[] = []
  expect(GetFeatureActivationEventsVirtualDom.getFeatureActivationEventsVirtualDom(activationEvents)).toEqual([
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text('Activation Events'),
    {
      childCount: 0,
      type: VirtualDomElements.Ul,
    },
  ])
})
