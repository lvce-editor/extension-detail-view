import type { Feature } from '../Feature/Feature.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFeatures = (selectedFeature: string): readonly Feature[] => {
  if (!selectedFeature) {
    selectedFeature = InputName.Theme
  }
  const features: readonly Feature[] = [
    {
      id: InputName.Theme,
      label: 'Theme',
      selected: selectedFeature === InputName.Theme,
    },
    {
      id: InputName.Commands,
      label: 'Commands',
      selected: selectedFeature === InputName.Commands,
    },
    {
      id: InputName.JsonValidation,
      label: 'Json Validation',
      selected: selectedFeature === InputName.JsonValidation,
    },
    {
      id: InputName.ProgrammingLanguages,
      label: 'Programming Languages',
      selected: selectedFeature === InputName.ProgrammingLanguages,
    },
    {
      id: InputName.Settings,
      label: 'Settings',
      selected: selectedFeature === InputName.Settings,
    },
  ]
  return features
}
