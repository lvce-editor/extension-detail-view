import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Row } from '../Row/Row.ts'
import * as GetJsonValidationTableEntry from '../GetJsonValidationTableEntry/GetJsonValidationTableEntry.ts'

export const getFeatureDetailsJsonValidation = (extension: any): Partial<ExtensionDetailState> => {
  const validations = extension.jsonValidation || []
  const rows: readonly Row[] = validations.map(GetJsonValidationTableEntry.getJsonValidationTableEntry)
  return {
    jsonValidation: rows,
  }
}
