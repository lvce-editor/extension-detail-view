import { register } from '../FeatureRegistry/FeatureRegistry.ts'
import * as ActivationEventsFeature from './FeatureActivationEvents.ts'
import * as CommandsFeature from './FeatureCommands.ts'
import * as JsonValidationFeature from './FeatureJsonValidation.ts'
import * as ProgrammingLanguagesFeature from './FeatureProgrammingLanguages.ts'
import * as SettingsFeature from './FeatureSettings.ts'
import * as ThemeFeature from './FeatureTheme.ts'
import * as WebViewsFeature from './FeatureWebViews.ts'

export const registerAllFeatures = (): void => {
  register({
    id: ThemeFeature.id,
    getLabel: ThemeFeature.getLabel,
    isEnabled: ThemeFeature.isEnabled,
    getDetails: ThemeFeature.getDetails,
    getVirtualDom: ThemeFeature.getVirtualDom,
  })
  register({
    id: CommandsFeature.id,
    getLabel: CommandsFeature.getLabel,
    isEnabled: CommandsFeature.isEnabled,
    getDetails: CommandsFeature.getDetails,
    getVirtualDom: CommandsFeature.getVirtualDom,
  })
  register({
    id: SettingsFeature.id,
    getLabel: SettingsFeature.getLabel,
    isEnabled: SettingsFeature.isEnabled,
    getDetails: SettingsFeature.getDetails,
    getVirtualDom: SettingsFeature.getVirtualDom,
  })
  register({
    id: JsonValidationFeature.id,
    getLabel: JsonValidationFeature.getLabel,
    isEnabled: JsonValidationFeature.isEnabled,
    getDetails: JsonValidationFeature.getDetails,
    getVirtualDom: JsonValidationFeature.getVirtualDom,
  })
  register({
    id: ProgrammingLanguagesFeature.id,
    getLabel: ProgrammingLanguagesFeature.getLabel,
    isEnabled: ProgrammingLanguagesFeature.isEnabled,
    getDetails: ProgrammingLanguagesFeature.getDetails,
    getVirtualDom: ProgrammingLanguagesFeature.getVirtualDom,
  })
  register({
    id: WebViewsFeature.id,
    getLabel: WebViewsFeature.getLabel,
    isEnabled: WebViewsFeature.isEnabled,
    getDetails: WebViewsFeature.getDetails,
    getVirtualDom: WebViewsFeature.getVirtualDom,
  })
  register({
    id: ActivationEventsFeature.id,
    getLabel: ActivationEventsFeature.getLabel,
    isEnabled: ActivationEventsFeature.isEnabled,
    getDetails: ActivationEventsFeature.getDetails,
    getVirtualDom: ActivationEventsFeature.getVirtualDom,
  })
}