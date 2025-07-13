import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getMoreInfoEntryValueClassName = (onClick: string | undefined, code: boolean | undefined): string => {
  if (onClick) {
    return MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Link)
  }
  if (code) {
    return MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Code)
  }
  return ClassNames.MoreInfoEntryValue
}
