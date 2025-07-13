import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetJsonValidationTableEntry from '../GetJsonValidationTableEntry/GetJsonValidationTableEntry.ts'

export const getJsonValidationDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const validations = extension.jsonValidation || []
  const rows = validations.map(GetJsonValidationTableEntry.getJsonValidationTableEntry)
  return {
    jsonValidation: rows,
  }
}
