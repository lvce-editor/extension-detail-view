export const getPadding = (width: number): number => {
  if (width < 600) {
    return 10
  }
  if (width < 800) {
    return 10
  }
  if (width < 1200) {
    return 30
  }
  return 40
}

export const getSideBarWidth = (width: number): number => {
  if (width < 490) {
    return 0
  }
  if (width < 650) {
    return Math.round(width / 4)
  }
  if (width < 800) {
    return Math.round(width / 4)
  }
  return Math.round(width / 4)
}
