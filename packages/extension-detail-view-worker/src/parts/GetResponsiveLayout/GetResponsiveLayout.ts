import { getPadding, getSideBarWidth } from '../GetPadding/GetPadding.ts'

export interface ResponsiveLayout {
  readonly paddingLeft: number
  readonly paddingRight: number
  readonly showSideBar: boolean
  readonly sideBarWidth: number
}

export const getResponsiveLayout = (width: number): ResponsiveLayout => {
  const padding = getPadding(width)
  const sideBarWidth = getSideBarWidth(width)
  return {
    paddingLeft: padding,
    paddingRight: padding,
    showSideBar: sideBarWidth > 0,
    sideBarWidth,
  }
}
