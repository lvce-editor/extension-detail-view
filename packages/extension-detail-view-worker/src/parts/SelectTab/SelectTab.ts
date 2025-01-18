import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetSelectTabHandler from '../GetSelectTabHandler/GetSelectTabHandler.ts'

export const selectTab = (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  const fn = GetSelectTabHandler.getSelectTabHandler(name)
  return fn(state)
}
