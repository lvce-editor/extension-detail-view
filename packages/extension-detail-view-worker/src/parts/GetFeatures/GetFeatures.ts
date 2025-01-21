import type { Feature } from '../Feature/Feature.ts'
import * as InputName from '../InputName/InputName.ts'

const hasThemes = (extension: any): boolean => {
  return extension && (extension.colorThemes || extension.iconThemes || extension.productIconThemes)
}

const getThemeFeatures = (selectedFeature: string, extension: any): readonly Feature[] => {
  if (!hasThemes(extension)) {
    return []
  }
  return [
    {
      id: InputName.Theme,
      label: 'Theme',
      selected: selectedFeature === InputName.Theme,
    },
  ]
}

const hasCommands = (extension: any): boolean => {
  return extension && extension.commands
}

const getCommandFeatures = (selectedFeature: string, extension: any): readonly Feature[] => {
  if (!hasCommands(extension)) {
    return []
  }
  return [
    {
      id: InputName.Commands,
      label: 'Commands',
      selected: selectedFeature === InputName.Commands,
    },
  ]
}

const hasJsonValidation = (extension: any): boolean => {
  return extension && extension.jsonValidation
}

const getJsonValidationFeatures = (selectedFeature: string, extension: any): readonly Feature[] => {
  if (!hasJsonValidation(extension)) {
    return []
  }
  return [
    {
      id: InputName.JsonValidation,
      label: 'Json Validation',
      selected: selectedFeature === InputName.JsonValidation,
    },
  ]
}

export const getFeatures = (selectedFeature: string, extension: any): readonly Feature[] => {
  if (!selectedFeature) {
    selectedFeature = InputName.Theme
  }
  const features: readonly Feature[] = [
    ...getThemeFeatures(selectedFeature, extension),
    ...getCommandFeatures(selectedFeature, extension),
    ...getJsonValidationFeatures(selectedFeature, extension),
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
