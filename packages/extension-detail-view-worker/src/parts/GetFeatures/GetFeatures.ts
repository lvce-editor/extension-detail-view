import type { Feature } from '../Feature/Feature.ts'
import * as FeatureRegistry from '../FeatureRegistry/FeatureRegistry.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFeatures = (selectedFeature: string, extension: any): readonly Feature[] => {
  if (!selectedFeature) {
    selectedFeature = InputName.Theme
  }
  return FeatureRegistry.getFeatures(selectedFeature, extension)
}
