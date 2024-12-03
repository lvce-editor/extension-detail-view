import * as ViewletSize from '../ViewletSize/ViewletSize.ts'

export const getViewletSize = (width: number): number => {
  if (width < 180) {
    return ViewletSize.Small
  }
  if (width < 768) {
    return ViewletSize.Normal
  }
  return ViewletSize.Large
}
