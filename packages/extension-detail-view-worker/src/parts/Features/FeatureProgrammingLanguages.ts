import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

const hasProgrammingLanguages = (extension: any): boolean => {
  return extension && extension.programmingLanguages
}

const getProgrammingLanguagesDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  // Programming languages feature doesn't need to store additional state
  return {}
}

const getProgrammingLanguagesVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom()
}

export const id = InputName.ProgrammingLanguages
export const getLabel = ExtensionDetailStrings.programmingLanguages
export const isEnabled = hasProgrammingLanguages
export const getDetails = getProgrammingLanguagesDetails
export const getVirtualDom = getProgrammingLanguagesVirtualDom
