export interface ExtensionDetailButton {
  readonly enabled: boolean
  readonly label: string
  readonly name: string
  readonly onClick: string | number
  readonly onMouseEnter?: string | number
  readonly onMouseLeave?: string | number
}
