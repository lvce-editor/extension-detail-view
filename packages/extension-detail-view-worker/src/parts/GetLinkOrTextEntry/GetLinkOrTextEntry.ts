import type { Cell } from '../Cell/Cell.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

const stringifyValue = (value: unknown): string => {
  return JSON.stringify(value)
}

export const getLinkOrTextEntry = (schema: string, schemaLinkUrl: string): Cell => {
  if (typeof schema !== 'string') {
    return {
      type: TableCellType.Text,
      value: stringifyValue(schema),
    }
  }
  if (schemaLinkUrl) {
    return {
      type: TableCellType.Link,
      value: schema,
      href: schemaLinkUrl,
    }
  }
  return {
    type: TableCellType.Text,
    value: schema,
  }
}
