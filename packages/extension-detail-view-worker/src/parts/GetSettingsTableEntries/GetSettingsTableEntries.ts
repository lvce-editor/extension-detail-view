import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

const getSettingsTableEntry = (setting: any): Row => {
  const { id, label } = setting
  // TODO watch out for  null/undefined/number/string/array
  return [
    {
      type: TableCellType.Text,
      value: id,
    },
    {
      type: TableCellType.Text,
      value: label,
    },
  ]
}

export const getSettingsTableEntries = (extension: any): TableInfo => {
  const settings = extension.settings || []
  const rows: readonly Row[] = settings.map(getSettingsTableEntry)
  return {
    headings: ['ID', 'Label'],
    rows,
  }
}
