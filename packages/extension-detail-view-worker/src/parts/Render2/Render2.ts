import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const render2 = (uid: number, diffResult: readonly number[]): readonly VirtualDomNode[] => {
  const { oldState, newState } = ExtensionDetailStates.get(uid)
  ExtensionDetailStates.set(uid, newState, newState)
  const commands = ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
