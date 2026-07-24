import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderTitle = (state: ExtensionDetailState): string => {
  const { name } = state
  return name
}
