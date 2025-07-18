import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const { get, set, dispose, wrapCommand, wrapGetter } = ViewletRegistry.create<ExtensionDetailState>()
