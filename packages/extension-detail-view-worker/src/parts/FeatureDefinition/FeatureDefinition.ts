import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface FeatureDefinition {
  readonly id: string
  readonly getLabel: () => string
  readonly isEnabled: (extension: any) => boolean
  readonly getDetails: (extension: any, baseUrl: string) => Promise<Partial<ExtensionDetailState>>
  readonly getVirtualDom: (state: ExtensionDetailState) => readonly VirtualDomNode[]
}