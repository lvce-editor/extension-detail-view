import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const selectedClassName = MergeClassNames.mergeClassNames(ClassNames.ExtensionDetailTab, ClassNames.ExtensionDetailTabSelected)
const defaultClassName = ClassNames.ExtensionDetailTab

export const getTabClassName = (isSelected: boolean): string => {
  return isSelected ? selectedClassName : defaultClassName
}
