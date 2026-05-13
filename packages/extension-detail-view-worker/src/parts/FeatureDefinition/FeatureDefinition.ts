import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface FeatureDefinition<T extends Partial<ExtensionDetailState>> {
  readonly getDetails: (extension: any, baseUrl: string, locationProtocol: string) => Promise<T>
  readonly getLabel: () => string
  readonly getVirtualDom: (state: T) => readonly VirtualDomNode[]
  readonly id: string
  readonly isEnabled: (extension: any) => boolean
}
