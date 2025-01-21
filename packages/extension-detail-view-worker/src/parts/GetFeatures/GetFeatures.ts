import type { Feature } from '../Feature/Feature.ts'
import * as InputName from '../InputName/InputName.ts'

const hasThemes = (extension: any): boolean => {
  return extension && (extension.colorThemes || extension.iconThemes || extension.productIconThemes)
}

const hasCommands = (extension: any): boolean => {
  return extension && extension.commands
}

const hasJsonValidation = (extension: any): boolean => {
  return extension && extension.jsonValidation
}

const hasProgrammingLanguages = (extension: any): boolean => {
  return extension && extension.programmingLanguages
}

const hasSettings = (extension: any): boolean => {
  return extension && extension.settings
}

const ifElseFeature = (
  id: string,
  label: string,
  isEnabled: (extension: any) => boolean,
  selectedFeature: string,
  extension: any,
): readonly Feature[] => {
  if (!isEnabled(extension)) {
    return []
  }
  return [
    {
      id,
      label,
      selected: selectedFeature === id,
    },
  ]
}

export const getFeatures = (selectedFeature: string, extension: any): readonly Feature[] => {
  if (!selectedFeature) {
    selectedFeature = InputName.Theme
  }
  const features: readonly Feature[] = [
    ...ifElseFeature(InputName.Theme, 'Theme', hasThemes, selectedFeature, extension),
    ...ifElseFeature(InputName.Commands, 'Commands', hasCommands, selectedFeature, extension),
    ...ifElseFeature(InputName.JsonValidation, 'Json Validation', hasJsonValidation, selectedFeature, extension),
    ...ifElseFeature(InputName.ProgrammingLanguages, 'Programming Languages', hasProgrammingLanguages, selectedFeature, extension),
    ...ifElseFeature(InputName.Settings, 'Settings', hasSettings, selectedFeature, extension),
  ]
  return features
}
