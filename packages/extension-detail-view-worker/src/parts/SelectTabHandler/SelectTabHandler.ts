import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export interface SelectTabHandler {
  (state: ExtensionDetailState): Promise<ExtensionDetailState>
}
