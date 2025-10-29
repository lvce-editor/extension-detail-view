// TODO make all properties required so objects have same shape
export interface MoreInfoEntry {
  readonly key: string
  readonly value: string
  readonly onClick?: string | number
  readonly odd?: boolean
  readonly code?: boolean
  readonly title?: string
}
