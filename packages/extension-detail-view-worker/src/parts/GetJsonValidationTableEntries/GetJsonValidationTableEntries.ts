import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getJsonValidationTableEntries = (rows: readonly Row[]): TableInfo => {
  return {
    headings: [ExtensionDetailStrings.fileMatch(), ExtensionDetailStrings.schema()],
    rows,
  }
}
