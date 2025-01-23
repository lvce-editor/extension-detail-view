import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const resourceNode: VirtualDomNode = {
  // TODO use link with url
  type: VirtualDomElements.Div,
  className: ClassNames.Resource,
  childCount: 1,
}

export const getResourceVirtualDom = (resource: Resource): readonly VirtualDomNode[] => {
  const { label } = resource
  return [resourceNode, text(label)]
}
