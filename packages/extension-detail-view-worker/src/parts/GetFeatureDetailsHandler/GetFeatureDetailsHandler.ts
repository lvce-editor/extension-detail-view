import type { FeatureDetailsHandler } from '../FeatureDetailsHandler/FeatureDetailsHandler.ts'
import { getFeatureDetailsActivationEvents } from '../GetFeatureDetailsActivationEvents/GetFeatureDetailsActivationEvents.ts'
import { getFeatureDetailsCommand } from '../GetFeatureDetailsCommands/GetFeatureDetailsCommands.ts'
import { getFeatureDetailsJsonValidation } from '../GetFeatureDetailsJsonValidation/GetFeatureDetailsJsonValidation.ts'
import { getFeatureDetailsProgrammingLanguages } from '../GetFeatureDetailsProgrammingLanguages/GetFeatureDetailsProgrammingLanguages.ts'
import { getFeatureDetailsSettings } from '../GetFeatureDetailsSettings/GetFeatureDetailsSettings.ts'
import { getFeatureDetailsTheme } from '../GetFeatureDetailsTheme/GetFeatureDetailsTheme.ts'
import { getFeatureDetailsWebView } from '../GetFeatureDetailsWebView/GetFeatureDetailsWebView.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFeatureDetailsHandler = (featureName: string): FeatureDetailsHandler => {
  switch (featureName) {
    case InputName.ActivationEvents:
      return getFeatureDetailsActivationEvents
    case InputName.Commands:
      return getFeatureDetailsCommand
    case InputName.JsonValidation:
      return getFeatureDetailsJsonValidation
    case InputName.ProgrammingLanguages:
      return getFeatureDetailsProgrammingLanguages
    case InputName.Settings:
      return getFeatureDetailsSettings
    case InputName.Theme:
      return getFeatureDetailsTheme
    case InputName.WebViews:
      return getFeatureDetailsWebView
    default:
      throw new Error(`unknown feature details handler: ${featureName}`)
  }
}
