import type { Row } from '../Row/Row.ts'

export interface TableInfo {
  readonly headings: readonly string[]
  readonly rows: readonly Row[]
}
