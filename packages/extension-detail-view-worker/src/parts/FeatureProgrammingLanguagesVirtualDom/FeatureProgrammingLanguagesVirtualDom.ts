import type { FeatureProgrammingLanguagesState } from '../FeatureProgrammingLanguagesDetails/FeatureProgrammingLanguagesDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'

export const getProgrammingLanguagesVirtualDom = (state: FeatureProgrammingLanguagesState): readonly VirtualDomNode[] => {
  const { programmingLanguages } = state
  return GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom(programmingLanguages)
}
