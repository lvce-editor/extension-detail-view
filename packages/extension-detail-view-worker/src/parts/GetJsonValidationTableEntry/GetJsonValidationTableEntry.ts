import type { Row } from '../Row/Row.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

const isExternalLink = (schema: string): boolean => {
  return schema.startsWith('http://') || schema.startsWith('https://')
}

const getSchemaLinkUrl = (schema: string, extensionUri: string): string => {
  if (isExternalLink(schema)) {
    return schema
  }
  return new URL(schema, extensionUri).toString()
}

export const getJsonValidationTableEntry = (validation: any, extensionUri: string): Row => {
  // TODO handle case when validation is invalid like null
  const { fileMatch } = validation
  const schema = validation.schema ?? validation.url
  const schemaLinkUrl = getSchemaLinkUrl(schema, extensionUri)
  return [
    {
      type: TableCellType.Code,
      value: fileMatch,
    },
    {
      type: TableCellType.Link,
      value: schema,
      href: schemaLinkUrl,
    },
  ]
}
