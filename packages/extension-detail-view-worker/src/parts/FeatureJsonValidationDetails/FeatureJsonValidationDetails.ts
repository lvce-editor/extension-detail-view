import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getJsonValidationInfos } from '../GetJsonValidationInfos/GetJsonValidationInfos.ts'
import * as GetJsonValidationTableEntry from '../GetJsonValidationTableEntry/GetJsonValidationTableEntry.ts'

export const getJsonValidationDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const validations = extension.jsonValidation || []
  const extensionUri = extension.uri || ''
  const validationInfos = await getJsonValidationInfos(extensionUri, validations)
  const rows = validationInfos.map(GetJsonValidationTableEntry.getJsonValidationTableEntry)
  return {
    jsonValidation: rows,
  }
}
