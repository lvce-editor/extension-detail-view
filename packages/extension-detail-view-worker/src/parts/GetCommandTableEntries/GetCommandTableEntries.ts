import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getCommandTableEntries = (rows: readonly Row[]): TableInfo => {
  const id = ExtensionDetailStrings.id()
  const label = ExtensionDetailStrings.label()
  return {
    headings: [id, label],
    rows,
  }
}
