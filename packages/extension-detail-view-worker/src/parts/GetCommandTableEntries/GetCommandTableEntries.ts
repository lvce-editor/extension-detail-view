import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetCommandTableEntry from '../GetCommandTableEntry/GetCommandTableEntry.ts'

export const getCommandTableEntries = (extension: any): TableInfo => {
  const commands = extension.commands || []
  const rows: readonly Row[] = commands.map(GetCommandTableEntry.getCommandTableEntry)
  const id = ExtensionDetailStrings.id()
  const label = ExtensionDetailStrings.label()
  return {
    headings: [id, label],
    rows,
  }
}
