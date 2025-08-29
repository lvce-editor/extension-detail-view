export const getPadding = (width: number): number => {
  if (width < 600) {
    return 10
  }
  if (width < 800) {
    return 20
  }
  if (width < 1200) {
    return 30
  }
  return 40
}

export const getSideBarWidth = (width: number): number => {
  if (width < 600) {
    return 0
  }
  if (width < 800) {
    return 320
  }
  return 320
}
