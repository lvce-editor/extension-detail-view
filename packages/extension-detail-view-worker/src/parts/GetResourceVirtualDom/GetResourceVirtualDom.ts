import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getResourceVirtualDom = (resource: Resource): readonly VirtualDomNode[] => {
  const { label } = resource
  return [
    {
      // TODO use link with url
      type: VirtualDomElements.Div,
      className: 'Resource',
      childCount: 1,
    },
    text(label),
  ]
}
