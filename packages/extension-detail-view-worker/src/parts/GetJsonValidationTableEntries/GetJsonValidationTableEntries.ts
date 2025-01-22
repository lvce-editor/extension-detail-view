import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetJsonValidationTableEntry from '../GetJsonValidationTableEntry/GetJsonValidationTableEntry.ts'

export const getJsonValidationTableEntries = (extension: any): TableInfo => {
  const validations = extension.jsonValidation || []
  const rows: readonly Row[] = validations.map(GetJsonValidationTableEntry.getJsonValidationTableEntry)
  return {
    headings: [ExtensionDetailStrings.fileMatch(), ExtensionDetailStrings.schema()],
    rows,
  }
}
