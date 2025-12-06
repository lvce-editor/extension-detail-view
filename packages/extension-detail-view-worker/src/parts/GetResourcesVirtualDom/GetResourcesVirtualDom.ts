import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetResourceVirtualDom from '../GetResourceVirtualDom/GetResourceVirtualDom.ts'

export const getResourcesVirtualDom = (resources: readonly Resource[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: resources.length,
      className: ClassNames.Resources,
      type: VirtualDomElements.Div,
    },
    ...resources.flatMap(GetResourceVirtualDom.getResourceVirtualDom),
  ]
}
