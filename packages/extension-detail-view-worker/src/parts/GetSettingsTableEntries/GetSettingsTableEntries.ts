import type { Row, TableInfo } from '../TableInfo/TableInfo.ts'

export const getSettingsTableEntries = (extension: any): TableInfo => {
  // TODO maybe use a flat string array for rows
  const rows: Row[] = []
  const settings = extension.settings || []
  for (const setting of settings) {
    const { id, label } = setting
    // TODO watch out for command being null/undefined/number/string/array
    rows.push([id, label])
  }
  return {
    headings: ['ID', 'Label'],
    rows,
  }
}
