import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleWheel = (state: ExtensionDetailState, deltaX: number, deltaY: number): ExtensionDetailState => {
  const newScrollTop = Math.max(0, state.readmeScrollTop + deltaY)
  return {
    ...state,
    readmeScrollTop: newScrollTop,
  }
}