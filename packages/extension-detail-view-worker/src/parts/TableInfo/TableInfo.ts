export type Row = readonly string[]

export interface TableInfo {
  readonly headings: readonly string[]
  readonly rows: readonly Row[]
}
