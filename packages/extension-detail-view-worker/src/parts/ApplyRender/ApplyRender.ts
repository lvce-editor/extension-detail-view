import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetRenderer from '../GetRenderer/GetRenderer.ts'

export const applyRender = async (
  oldState: ExtensionDetailState,
  newState: ExtensionDetailState,
  diffResult: readonly number[],
): Promise<readonly any[]> => {
  const commands = []
  for (const item of diffResult) {
    const fn = GetRenderer.getRenderer(item)
    commands.push(await fn(oldState, newState))
  }
  return commands
}
