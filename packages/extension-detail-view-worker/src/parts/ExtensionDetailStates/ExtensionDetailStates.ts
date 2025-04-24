import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ViewletRegistry from '@lvce-editor/viewlet-registry'

export const { get, set, dispose, wrapCommand } = ViewletRegistry.create<ExtensionDetailState>()
