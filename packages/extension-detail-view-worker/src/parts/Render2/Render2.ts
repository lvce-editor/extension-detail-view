import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ApplyRender from '../ApplyRender/ApplyRender.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const render2 = async (uid: number, diffResult: readonly number[]): Promise<readonly VirtualDomNode[]> => {
  const { oldState, newState } = ExtensionDetailStates.get(uid)
  ExtensionDetailStates.set(uid, oldState, newState)
  const commands = await ApplyRender.applyRender(oldState, newState, diffResult)
  return commands
}
