import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { FeatureProgrammingLanguagesDetails } from '../FeatureProgrammingLanguagesDetails/FeatureProgrammingLanguagesDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'

export const getProgrammingLanguagesVirtualDom = (state: FeatureProgrammingLanguagesDetails): readonly VirtualDomNode[] => {
  const { programmingLanguages } = state
  return GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom(programmingLanguages)
}
