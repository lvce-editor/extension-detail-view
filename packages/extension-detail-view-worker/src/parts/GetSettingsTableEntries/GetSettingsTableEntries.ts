import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getSettingsTableEntries = (extension: any): TableInfo => {
  // TODO maybe use a flat string array for rows
  const rows: Row[] = []
  const settings = extension.settings || []
  for (const setting of settings) {
    const { id, label } = setting
    // TODO watch out for command being null/undefined/number/string/array
    rows.push([
      {
        type: TableCellType.Text,
        value: id,
      },
      {
        type: TableCellType.Text,
        value: label,
      },
    ])
  }
  return {
    headings: ['ID', 'Label'],
    rows,
  }
}
