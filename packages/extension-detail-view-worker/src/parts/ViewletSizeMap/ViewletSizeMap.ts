import * as ViewletSize from '../ViewletSize/ViewletSize.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getClassNames = (size: number): string => {
  switch (size) {
    case ViewletSize.Small:
      return ClassNames.Small
    case ViewletSize.Normal:
      return ClassNames.Normal
    case ViewletSize.Large:
      return ClassNames.Large
    default:
      return ''
  }
}
