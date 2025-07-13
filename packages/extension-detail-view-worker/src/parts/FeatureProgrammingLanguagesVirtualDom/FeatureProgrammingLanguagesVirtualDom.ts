import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'

export const getProgrammingLanguagesVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom()
}
