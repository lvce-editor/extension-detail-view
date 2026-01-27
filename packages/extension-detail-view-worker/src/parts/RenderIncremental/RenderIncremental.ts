import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { renderDom } from '../RenderDom/RenderDom.ts'

export const renderIncremental = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const { uid } = newState
  const oldDom = renderDom(oldState, oldState)[2]
  const newDom = renderDom(newState, newState)[2]
  const patches = diffTree(oldDom, newDom)
  return [ViewletCommand.SetPatches, uid, patches]
}
