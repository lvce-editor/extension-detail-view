import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const { dispose, get, getCommandIds, registerCommands, set, wrapAsyncCommand, wrapCommand, wrapGetter, wrapSerialCommand } =
  ViewletRegistry.create<ExtensionDetailState>()
