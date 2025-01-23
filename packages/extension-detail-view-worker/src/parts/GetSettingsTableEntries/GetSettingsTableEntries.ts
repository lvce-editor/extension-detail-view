import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as GetSettingsTableEntry from '../GetSettingsTableEntry/GetSettingsTableEntry.ts'

export const getSettingsTableEntries = (extension: any): TableInfo => {
  const settings = extension.settings || []
  const rows: readonly Row[] = settings.map(GetSettingsTableEntry.getSettingsTableEntry)
  return {
    headings: ['ID', 'Label'],
    rows,
  }
}
