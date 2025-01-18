import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetMoreInfoVirtualDom from '../GetMoreInfoVirtualDom/GetMoreInfoVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getAdditionalDetailsVirtualDom = (): readonly VirtualDomNode[] => {
  const entries: readonly MoreInfoEntry[] = [
    {
      key: 'Identifier',
      value: 'abc',
    },
    {
      key: 'Version',
      value: '1.9.5',
    },
    {
      key: 'Last Updated',
      value: '',
    },
    {
      key: 'Published',
      value: '',
    },
  ]
  return [
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetails',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetailsTitle',
      childCount: 1,
    },
    text('Installation'),
    ...GetMoreInfoVirtualDom.getMoreInfoVirtualDom(entries),
  ]
}
