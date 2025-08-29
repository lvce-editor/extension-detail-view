import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const classLink = MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Link)

const classCode = MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Code)

export const getMoreInfoEntryValueClassName = (onClick: string | undefined, code: boolean | undefined): string => {
  if (onClick) {
    return classLink
  }
  if (code) {
    return classCode
  }
  return ClassNames.MoreInfoEntryValue
}
