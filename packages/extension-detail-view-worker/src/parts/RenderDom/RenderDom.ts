import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'

export const renderDom = async (oldState: ExtensionDetailState, newState: ExtensionDetailState): Promise<readonly any[]> => {
  const dom = await GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(newState, newState.sanitizedReadmeHtml, newState.selectedTab)
  return ['Viewlet.setDom2', dom]
}
