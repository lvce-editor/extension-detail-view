export interface ExtensionDetailButton {
  readonly enabled: boolean
  readonly label: string
  readonly menuId?: number
  readonly menuOnClick?: string | number
  readonly name: string
  readonly onClick: string | number
  readonly onMouseEnter?: string | number
  readonly onMouseLeave?: string | number
}
