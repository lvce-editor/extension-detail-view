export const getPadding = (width: number): number => {
  if (width < 400) {
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
