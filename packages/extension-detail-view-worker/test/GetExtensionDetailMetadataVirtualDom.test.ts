import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getExtensionDetailMetadataVirtualDom } from '../src/parts/GetExtensionDetailMetadataVirtualDom/GetExtensionDetailMetadataVirtualDom.ts'

test('renders only the download count when the rating is unavailable', () => {
  expect(getExtensionDetailMetadataVirtualDom('1,000', 'n/a')).toEqual([
    {
      childCount: 1,
      className: 'ExtensionDetailMetadata',
      type: VirtualDomElements.Div,
    },
    {
      ariaLabel: 'Downloads: 1,000',
      childCount: 1,
      className: 'ExtensionDetailStatistic ExtensionDetailDownloadCount',
      title: 'Downloads: 1,000',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: '1,000',
      type: VirtualDomElements.Text,
    },
  ])
})
