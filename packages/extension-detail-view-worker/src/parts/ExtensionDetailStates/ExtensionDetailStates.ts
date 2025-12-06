import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const { dispose, get, getCommandIds, registerCommands, set, wrapCommand, wrapGetter } = ViewletRegistry.create<ExtensionDetailState>()
