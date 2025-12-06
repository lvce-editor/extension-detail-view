import type { Row } from '../Row/Row.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getProgrammingLanguageTableEntry = (programmingLanguage: any): Row => {
  const { configuration, extensions, id } = programmingLanguage
  const name = '' // TODO
  const snippets = '' // TODO
  return [
    {
      type: TableCellType.Text,
      value: id,
    },
    {
      type: TableCellType.Text,
      value: name,
    },
    {
      listItems: extensions,
      type: TableCellType.CodeList,
      value: '',
    },
    {
      checked: Boolean(configuration),
      type: TableCellType.CheckMark,
      value: '',
    },
    {
      checked: Boolean(snippets),
      type: TableCellType.CheckMark,
      value: '',
    },
  ]
}
