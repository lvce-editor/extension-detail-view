import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Feature } from '../Feature/Feature.ts'
import type { FeatureDefinition } from '../FeatureDefinition/FeatureDefinition.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface FeatureRegistry {
  readonly register: (feature: FeatureDefinition) => void
  readonly getFeatures: (selectedFeature: string, extension: any) => readonly Feature[]
  readonly getFeatureDetails: (featureName: string, extension: any, baseUrl: string) => Promise<Partial<ExtensionDetailState>>
  readonly getFeatureVirtualDom: (featureName: string, state: ExtensionDetailState) => readonly VirtualDomNode[]
}

const features = Object.create(null) as Record<string, FeatureDefinition>

export const register = (feature: FeatureDefinition): void => {
  features[feature.id] = feature
}

export const getFeatures = (selectedFeature: string, extension: any): readonly Feature[] => {
  const result: Feature[] = []

  for (const id in features) {
    const feature = features[id]
    if (feature.isEnabled(extension)) {
      result.push({
        id,
        label: feature.label,
        selected: selectedFeature === id,
      })
    }
  }

  return result
}

export const getFeatureDetails = async (featureName: string, extension: any, baseUrl: string): Promise<Partial<ExtensionDetailState>> => {
  const feature = features[featureName]
  if (!feature) {
    throw new Error(`unknown feature: ${featureName}`)
  }
  return feature.getDetails(extension, baseUrl)
}

export const getFeatureVirtualDom = (featureName: string, state: ExtensionDetailState): readonly VirtualDomNode[] => {
  const feature = features[featureName]
  if (!feature) {
    throw new Error(`unknown feature: ${featureName}`)
  }
  return feature.getVirtualDom(state)
}

export const createFeatureRegistry = (): FeatureRegistry => {
  return {
    register,
    getFeatures,
    getFeatureDetails,
    getFeatureVirtualDom,
  }
}