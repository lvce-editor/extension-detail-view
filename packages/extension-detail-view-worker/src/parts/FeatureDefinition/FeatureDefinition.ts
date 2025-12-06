import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface FeatureDefinition {
  readonly getDetails: (extension: any, baseUrl: string, locationProtocol: string) => Promise<Partial<ExtensionDetailState>>
  readonly getLabel: () => string
  readonly getVirtualDom: (state: ExtensionDetailState) => readonly VirtualDomNode[]
  readonly id: string
  readonly isEnabled: (extension: any) => boolean
}
