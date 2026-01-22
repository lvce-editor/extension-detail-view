import { ViewletCommand } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'

export const renderDom = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const { initial, uid } = newState
  if (initial) {
    return [ViewletCommand.SetDom2, uid, []]
  }
  const dom = GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(newState, newState.selectedTab)
  return [ViewletCommand.SetDom2, uid, dom]
}
