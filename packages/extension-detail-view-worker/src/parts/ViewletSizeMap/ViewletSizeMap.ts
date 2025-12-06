import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ViewletSize from '../ViewletSize/ViewletSize.ts'

export const getClassNames = (size: number): string => {
  switch (size) {
    case ViewletSize.Large:
      return ClassNames.Large
    case ViewletSize.Normal:
      return ClassNames.Normal
    case ViewletSize.Small:
      return ClassNames.Small
    default:
      return ''
  }
}
