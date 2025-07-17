import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleScroll = (state: ExtensionDetailState, scrollTop: number, scrollSource = InputSource.Script): ExtensionDetailState => {
  const newScrollTop = Math.max(0, scrollTop)
  return {
    ...state,
    readmeScrollTop: newScrollTop,
    scrollSource,
  }
}
