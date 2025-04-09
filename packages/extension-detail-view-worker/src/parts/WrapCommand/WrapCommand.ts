import { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export interface WrappedFn {
  (uid: number, ...args: readonly any[]): Promise<void>
}

interface Fn {
  (state: ExtensionDetailState, ...args: readonly any[]): ExtensionDetailState | Promise<ExtensionDetailState>
}

export const wrapCommand = (fn: Fn): WrappedFn => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = ExtensionDetailStates.get(uid)
    const newerState = await fn(newState, ...args)
    if (newState === newerState) {
      return
    }
    const latest = ExtensionDetailStates.get(uid)
    ExtensionDetailStates.set(uid, latest.oldState, newerState)
  }
  return wrapped
}
