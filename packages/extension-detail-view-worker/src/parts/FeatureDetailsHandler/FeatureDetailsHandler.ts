import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export interface FeatureDetailsHandler {
  (extension: any, baseUrl: string): Partial<ExtensionDetailState> | Promise<Partial<ExtensionDetailState>>
}
