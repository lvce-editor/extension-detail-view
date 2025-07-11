import type { Feature } from '../Feature/Feature.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
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

const hasWebViews = (extension: any): boolean => {
  return extension && extension.webViews
}

const hasActivationEvents = (extension: any): boolean => {
  return extension && extension.activation
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
  const textTheme = ExtensionDetailStrings.theme()
  const textCommands = ExtensionDetailStrings.commands()
  const textJsonValidation = ExtensionDetailStrings.jsonValidation()
  const programmingLanguages = ExtensionDetailStrings.programmingLanguages()
  const settings = ExtensionDetailStrings.settings()
  const webViews = ExtensionDetailStrings.webViews()
  const textActivationEvents = ExtensionDetailStrings.activationEvents()
  const features: readonly Feature[] = [
    ...ifElseFeature(InputName.ActivationEvents, textActivationEvents, hasActivationEvents, selectedFeature, extension),
    ...ifElseFeature(InputName.Theme, textTheme, hasThemes, selectedFeature, extension),
    ...ifElseFeature(InputName.Commands, textCommands, hasCommands, selectedFeature, extension),
    ...ifElseFeature(InputName.JsonValidation, textJsonValidation, hasJsonValidation, selectedFeature, extension),
    ...ifElseFeature(InputName.ProgrammingLanguages, programmingLanguages, hasProgrammingLanguages, selectedFeature, extension),
    ...ifElseFeature(InputName.Settings, settings, hasSettings, selectedFeature, extension),
    ...ifElseFeature(InputName.WebViews, webViews, hasWebViews, selectedFeature, extension),
  ]
  return features
}
