import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getSettingsTableEntries = (rows: readonly Row[]): TableInfo => {
  const textId = ExtensionDetailStrings.id()
  const textLabel = ExtensionDetailStrings.label()
  return {
    headings: [textId, textLabel],
    rows,
  }
}
