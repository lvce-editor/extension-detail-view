import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFeatureActivationEventsVirtualDom from '../src/parts/GetFeatureActivationEventsVirtualDom/GetFeatureActivationEventsVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('feature activation events virtual dom with events', () => {
  const activationEvents: readonly string[] = ['onCommand:workbench.action.openFile', 'onLanguage:typescript', 'onView:explorer']
  expect(GetFeatureActivationEventsVirtualDom.getFeatureActivationEventsVirtualDom(activationEvents)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Activation Events'),
    {
      type: VirtualDomElements.Ul,
      childCount: 3,
    },
    {
      type: VirtualDomElements.Li,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text('onCommand:workbench.action.openFile'),
    {
      type: VirtualDomElements.Li,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text('onLanguage:typescript'),
    {
      type: VirtualDomElements.Li,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text('onView:explorer'),
  ])
})

test('feature activation events virtual dom with empty events', () => {
  const activationEvents: readonly string[] = []
  expect(GetFeatureActivationEventsVirtualDom.getFeatureActivationEventsVirtualDom(activationEvents)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Activation Events'),
    {
      type: VirtualDomElements.Ul,
      childCount: 0,
    },
  ])
})
