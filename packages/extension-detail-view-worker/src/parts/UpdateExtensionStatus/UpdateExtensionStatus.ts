import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export interface UpdateFunction {
  (extensionId: string): Promise<any>
}

export const updateExtensionStatus = async (state: ExtensionDetailState, updateFunction: UpdateFunction): Promise<ExtensionDetailState> => {
  const { extensionId } = state
  const error = await updateFunction(extensionId)
  if (error) {
    await RendererWorker.confirm(`${error}`)
  }
  return state
}
