import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { FeatureState } from '../FeatureState/FeatureState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface FeatureDefinition<Key extends keyof ExtensionDetailState = keyof ExtensionDetailState> {
  readonly getDetails: (extension: any, baseUrl: string, locationProtocol: string) => Promise<FeatureState<Key>>
  readonly getLabel: () => string
  readonly getVirtualDom: (state: FeatureState<Key>) => readonly VirtualDomNode[]
  readonly id: string
  readonly isEnabled: (extension: any) => boolean
}
