import * as Diff from '../Diff/Diff.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState, newState } = ExtensionDetailStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  return diffResult
}
