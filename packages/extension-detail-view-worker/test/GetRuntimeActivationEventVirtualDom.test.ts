import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getRuntimeActivationEventVirtualDom } from '../src/parts/GetRuntimeActivationEventVirtualDom/GetRuntimeActivationEventVirtualDom.ts'

test('returns no nodes without an activation event', () => {
  expect(getRuntimeActivationEventVirtualDom('')).toEqual([])
})

test('renders the activation event', () => {
  expect(getRuntimeActivationEventVirtualDom('onCommand:runtimeStatus.activate')).toEqual([
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListKey',
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Activation Event: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'RuntimeStatusDefinitionListValue',
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    {
      childCount: 0,
      text: 'onCommand:runtimeStatus.activate',
      type: VirtualDomElements.Text,
    },
  ])
})
