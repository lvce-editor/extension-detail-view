import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getResourceLinkVirtualDom } from '../GetResourceLinkVirtualDom/GetResourceLinkVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const resourceNode: VirtualDomNode = {
  // TODO use link with url
  type: VirtualDomElements.Div,
  className: ClassNames.Resource,
  childCount: 1,
}

export const getResourceVirtualDom = (resource: Resource): readonly VirtualDomNode[] => {
  const { label, url } = resource
  if (url && url !== '#') {
    return getResourceLinkVirtualDom(resource)
  }
  return [resourceNode, text(label)]
}
