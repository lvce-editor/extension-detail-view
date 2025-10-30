import * as Interpolate from '../Interpolate/Interpolate.ts'

export const getPadding = (width: number): number => {
  if (width < 600) {
    return 10
  }
  if (width < 800) {
    return 10
  }
  if (width < 1200) {
    return Interpolate.interpolate(width, 800, 1200, 10, 30)
  }
  return 30
}

export const getSideBarWidth = (width: number): number => {
  if (width < 490) {
    return 0
  }
  if (width < 650) {
    return Math.max(175 + Math.round(20 * (width / 100)), Math.round(width / 4))
  }
  if (width < 800) {
    return Math.max(175 + Math.round(20 * (width / 100)), Math.round(width / 4))
  }
  return Math.max(175 + Math.round(20 * (width / 100)), Math.round(width / 4))
}
