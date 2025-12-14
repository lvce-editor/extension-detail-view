import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { loadContent } from '../LoadContent/LoadContent.ts'

export const handleExtensionsChanged = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { platform } = state
  return loadContent(state, platform, {})
}
