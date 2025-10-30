import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export interface FeatureDetailsHandler {
  (extension: any, baseUrl: string, locationProtocol: string): Partial<ExtensionDetailState> | Promise<Partial<ExtensionDetailState>>
}

export interface FeatureDomHandler {
  (state: ExtensionDetailState): readonly VirtualDomNode[]
}
