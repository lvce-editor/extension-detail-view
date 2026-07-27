import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'
import { getResponsiveLayout } from '../GetResponsiveLayout/GetResponsiveLayout.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'

export const applyLatestResponsiveLayout = (state: ExtensionDetailState): ExtensionDetailState => {
  const { uid } = state
  const { width } = ExtensionDetailStates.get(uid).newState
  return {
    ...state,
    ...getResponsiveLayout(width),
    width,
  }
}

export const loadContent2 = async (state: ExtensionDetailState, savedState: unknown, isTest: boolean = false): Promise<ExtensionDetailState> => {
  const { platform } = state
  const loadedState = await LoadContent.loadContent(state, platform, savedState, isTest)
  return applyLatestResponsiveLayout(loadedState)
}
