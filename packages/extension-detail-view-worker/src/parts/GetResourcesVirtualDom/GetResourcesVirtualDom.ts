import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetResourceVirtualDom from '../GetResourceVirtualDom/GetResourceVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getResourcesVirtualDom = (resources: readonly Resource[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Resources,
      childCount: resources.length,
    },
    ...resources.flatMap(GetResourceVirtualDom.getResourceVirtualDom),
  ]
}
