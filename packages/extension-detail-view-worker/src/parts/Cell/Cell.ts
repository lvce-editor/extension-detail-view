export interface Cell {
  readonly className?: string
  readonly preserveEmptyValue?: boolean
  readonly [key: string]: any
  readonly title?: string
  readonly type: number
  readonly value: string
}
