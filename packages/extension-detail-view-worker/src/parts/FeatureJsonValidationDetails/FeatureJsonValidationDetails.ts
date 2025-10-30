import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetJsonValidationTableEntry from '../GetJsonValidationTableEntry/GetJsonValidationTableEntry.ts'

export const getJsonValidationDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const validations = extension.jsonValidation || []
  const extensionUri = extension.uri || ''
  const rows = validations.map((validation: any) => GetJsonValidationTableEntry.getJsonValidationTableEntry(validation, extensionUri))
  return {
    jsonValidation: rows,
  }
}
