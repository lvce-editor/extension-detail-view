import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetSelectTabHandler from '../GetSelectTabHandler/GetSelectTabHandler.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SelectTabChangelog from '../SelectTabChangelog/SelectTabChangelog.ts'

export const selectTab = (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  const fn = GetSelectTabHandler.getSelectTabHandler(name)
  return fn(state)
}

export const selectTabWithContext = async (context: AsyncCommandContext<ExtensionDetailState>, name: string): Promise<void> => {
  if (name === InputName.Changelog) {
    await SelectTabChangelog.selectTabChangelogWithContext(context)
    return
  }
  const state = context.getState()
  const fn = GetSelectTabHandler.getSelectTabHandler(name)
  const newState = await fn(state)
  await context.updateState(() => newState)
}
