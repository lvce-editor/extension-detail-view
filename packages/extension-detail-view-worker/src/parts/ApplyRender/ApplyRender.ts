import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = (oldState: ExtensionDetailState, newState: ExtensionDetailState, diffResult: readonly number[]): readonly any[] => {
  const commands = []
  for (const item of diffResult) {
    const fn = GetRenderer.getRenderer(item)
    const instanceCommands = fn(oldState, newState)
    if (instanceCommands.length > 0) {
      commands.push(instanceCommands)
    }
  }
  return commands
}
