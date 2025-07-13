import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureJsonValidationVirtualDom from '../GetFeatureJsonValidationVirtualDom/GetFeatureJsonValidationVirtualDom.ts'
import * as GetJsonValidationTableEntry from '../GetJsonValidationTableEntry/GetJsonValidationTableEntry.ts'
import * as InputName from '../InputName/InputName.ts'

const hasJsonValidation = (extension: any): boolean => {
  return extension && extension.jsonValidation
}

const getJsonValidationDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const validations = extension.jsonValidation || []
  const rows = validations.map(GetJsonValidationTableEntry.getJsonValidationTableEntry)
  return {
    jsonValidation: rows,
  }
}

const getJsonValidationVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom(state.jsonValidation)
}

export const id = InputName.JsonValidation
export const getLabel = ExtensionDetailStrings.jsonValidation
export const isEnabled = hasJsonValidation
export const getDetails = getJsonValidationDetails
export const getVirtualDom = getJsonValidationVirtualDom
