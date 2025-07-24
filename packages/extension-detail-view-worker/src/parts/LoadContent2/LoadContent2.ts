import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'

export const loadContent2 = async (state: ExtensionDetailState, savedState: unknown, isTest: boolean = false): Promise<ExtensionDetailState> => {
  return LoadContent.loadContent(state, state.platform, savedState, isTest)
}
