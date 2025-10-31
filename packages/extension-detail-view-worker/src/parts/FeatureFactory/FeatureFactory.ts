import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as FeatureActivationEventsDetails from '../FeatureActivationEventsDetails/FeatureActivationEventsDetails.ts'
import * as FeatureActivationEventsEnabled from '../FeatureActivationEventsEnabled/FeatureActivationEventsEnabled.ts'
import * as FeatureActivationEventsVirtualDom from '../FeatureActivationEventsVirtualDom/FeatureActivationEventsVirtualDom.ts'
import * as FeatureCommandsDetails from '../FeatureCommandsDetails/FeatureCommandsDetails.ts'
import * as FeatureCommandsEnabled from '../FeatureCommandsEnabled/FeatureCommandsEnabled.ts'
import * as FeatureCommandsVirtualDom from '../FeatureCommandsVirtualDom/FeatureCommandsVirtualDom.ts'
import * as FeatureJsonValidationDetails from '../FeatureJsonValidationDetails/FeatureJsonValidationDetails.ts'
import * as FeatureJsonValidationEnabled from '../FeatureJsonValidationEnabled/FeatureJsonValidationEnabled.ts'
import * as FeatureJsonValidationVirtualDom from '../FeatureJsonValidationVirtualDom/FeatureJsonValidationVirtualDom.ts'
import * as FeatureProgrammingLanguagesDetails from '../FeatureProgrammingLanguagesDetails/FeatureProgrammingLanguagesDetails.ts'
import * as FeatureProgrammingLanguagesEnabled from '../FeatureProgrammingLanguagesEnabled/FeatureProgrammingLanguagesEnabled.ts'
import * as FeatureProgrammingLanguagesVirtualDom from '../FeatureProgrammingLanguagesVirtualDom/FeatureProgrammingLanguagesVirtualDom.ts'
import { register } from '../FeatureRegistry/FeatureRegistry.ts'
import * as FeatureRuntimeStatusDetails from '../FeatureRuntimeStatusDetails/FeatureRuntimeStatusDetails.ts'
import * as FeatureRuntimeStatusEnabled from '../FeatureRuntimeStatusEnabled/FeatureRuntimeStatusEnabled.ts'
import * as FeatureRuntimeStatusVirtualDom from '../FeatureRuntimeStatusVirtualDom/FeatureRuntimeStatusVirtualDom.ts'
import * as FeatureSettingsDetails from '../FeatureSettingsDetails/FeatureSettingsDetails.ts'
import * as FeatureSettingsEnabled from '../FeatureSettingsEnabled/FeatureSettingsEnabled.ts'
import * as FeatureSettingsVirtualDom from '../FeatureSettingsVirtualDom/FeatureSettingsVirtualDom.ts'
import * as FeatureThemeDetails from '../FeatureThemeDetails/FeatureThemeDetails.ts'
import * as FeatureThemeEnabled from '../FeatureThemeEnabled/FeatureThemeEnabled.ts'
import * as FeatureThemeVirtualDom from '../FeatureThemeVirtualDom/FeatureThemeVirtualDom.ts'
import * as FeatureWebViewsDetails from '../FeatureWebViewsDetails/FeatureWebViewsDetails.ts'
import * as FeatureWebViewsEnabled from '../FeatureWebViewsEnabled/FeatureWebViewsEnabled.ts'
import * as FeatureWebViewsVirtualDom from '../FeatureWebViewsVirtualDom/FeatureWebViewsVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const registerAllFeatures = (): void => {
  register({
    id: InputName.Theme,
    getLabel: ExtensionDetailStrings.theme,
    isEnabled: FeatureThemeEnabled.featureThemeEnabled,
    getDetails: FeatureThemeDetails.getThemeDetails,
    getVirtualDom: FeatureThemeVirtualDom.getThemeVirtualDom,
  })
  register({
    id: InputName.Commands,
    getLabel: ExtensionDetailStrings.commands,
    isEnabled: FeatureCommandsEnabled.featureCommandsEnabled,
    getDetails: FeatureCommandsDetails.getCommandsDetails,
    getVirtualDom: FeatureCommandsVirtualDom.getCommandsVirtualDom,
  })
  register({
    id: InputName.Settings,
    getLabel: ExtensionDetailStrings.settings,
    isEnabled: FeatureSettingsEnabled.featureSettingsEnabled,
    getDetails: FeatureSettingsDetails.getSettingsDetails,
    getVirtualDom: FeatureSettingsVirtualDom.getSettingsVirtualDom,
  })
  register({
    id: InputName.JsonValidation,
    getLabel: ExtensionDetailStrings.jsonValidation,
    isEnabled: FeatureJsonValidationEnabled.featureJsonValidationEnabled,
    getDetails: FeatureJsonValidationDetails.getJsonValidationDetails,
    getVirtualDom: FeatureJsonValidationVirtualDom.getJsonValidationVirtualDom,
  })
  register({
    id: InputName.ProgrammingLanguages,
    getLabel: ExtensionDetailStrings.programmingLanguages,
    isEnabled: FeatureProgrammingLanguagesEnabled.featureProgrammingLanguagesEnabled,
    getDetails: FeatureProgrammingLanguagesDetails.getFeatureDetailsProgrammingLanguages,
    getVirtualDom: FeatureProgrammingLanguagesVirtualDom.getProgrammingLanguagesVirtualDom,
  })
  register({
    id: InputName.WebViews,
    getLabel: ExtensionDetailStrings.webViews,
    isEnabled: FeatureWebViewsEnabled.featureWebViewsEnabled,
    getDetails: FeatureWebViewsDetails.getWebViewsDetails,
    getVirtualDom: FeatureWebViewsVirtualDom.getWebViewsVirtualDom,
  })
  register({
    id: InputName.ActivationEvents,
    getLabel: ExtensionDetailStrings.activationEvents,
    isEnabled: FeatureActivationEventsEnabled.featureActivationEventsEnabled,
    getDetails: FeatureActivationEventsDetails.getActivationEventsDetails,
    getVirtualDom: FeatureActivationEventsVirtualDom.getActivationEventsVirtualDom,
  })
  register({
    id: InputName.RuntimeStatus,
    getLabel: ExtensionDetailStrings.runtimeStatus,
    isEnabled: FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled,
    getDetails: FeatureRuntimeStatusDetails.getRuntimeStatusDetails,
    getVirtualDom: FeatureRuntimeStatusVirtualDom.getRuntimeStatusVirtualDom,
  })
}
