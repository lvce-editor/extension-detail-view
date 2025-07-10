import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'

export const renderDom = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const dom = GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(newState, newState.selectedTab)
  return ['Viewlet.setDom2', dom]
}
