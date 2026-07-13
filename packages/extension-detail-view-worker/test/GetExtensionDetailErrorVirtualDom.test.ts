import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getExtensionDetailErrorVirtualDom } from '../src/parts/GetExtensionDetailErrorVirtualDom/GetExtensionDetailErrorVirtualDom.ts'

test('renders a friendly extension detail error', () => {
  expect(getExtensionDetailErrorVirtualDom('Unable to load extension', 'The extension is not available.')).toEqual([
    {
      childCount: 1,
      className: 'Viewlet ExtensionDetail ExtensionDetailError',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: 'ExtensionDetailErrorCard',
      role: 'alert',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconWarning ExtensionDetailErrorIcon',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailErrorTitle',
      type: VirtualDomElements.H1,
    },
    {
      childCount: 0,
      text: 'Unable to load extension',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailErrorMessage',
      type: VirtualDomElements.P,
    },
    {
      childCount: 0,
      text: 'The extension is not available.',
      type: VirtualDomElements.Text,
    },
  ])
})
