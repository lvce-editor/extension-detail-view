import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getProgrammingLanguagesTableEntries = (rows: readonly Row[]): TableInfo => {
  const id = ExtensionDetailStrings.id()
  const name = ExtensionDetailStrings.name()
  const fileExtensions = ExtensionDetailStrings.fileExtensions()
  const grammar = ExtensionDetailStrings.grammar()
  const snippets = ExtensionDetailStrings.snippets()
  return {
    headings: [id, name, fileExtensions, grammar, snippets],
    rows,
  }
}
