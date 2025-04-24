import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const dispose = (uid: number): void => {
  ExtensionDetailStates.dispose(uid)
}
