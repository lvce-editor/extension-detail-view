import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export type FeatureState<Key extends keyof ExtensionDetailState> = Pick<ExtensionDetailState, Key>
