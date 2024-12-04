import * as JoinBySpace from '../JoinBySpace/JoinBySpace.ts'

export const mergeClassNames = (...classNames: readonly string[]): string => {
  return JoinBySpace.joinBySpace(...classNames.filter(Boolean))
}
