import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export interface Renderer {
  (oldState: ExtensionDetailState, newState: ExtensionDetailState): Promise<readonly any[]>
}
