import type { Row, TableInfo } from '../TableInfo/TableInfo.ts'

export const getCommandTableEntries = (extension: any): TableInfo => {
  // TODO maybe use a flat string array for rows
  const rows: Row[] = []
  const commands = extension.commands || []
  for (const command of commands) {
    // TODO watch out for command being null/undefined/number/string/array
    rows.push([command.id, command.label])
  }
  return {
    headings: ['ID', 'Label'],
    rows,
  }
}
