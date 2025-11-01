import type { Row } from '../Row/Row.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getProgrammingLanguageTableEntry = (programmingLanguage: any): Row => {
  const { id, configuration, extensions } = programmingLanguage
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
      type: TableCellType.CodeList,
      value: '',
      listItems: extensions,
    },
    {
      type: TableCellType.CheckMark,
      value: '',
      checked: Boolean(configuration),
    },
    {
      type: TableCellType.CheckMark,
      value: '',
      checked: Boolean(snippets),
    },
  ]
}
