import type { FeatureDetailsHandler } from '../FeatureDetailsHandler/FeatureDetailsHandler.ts'
import { getFeatureDetailsCommand } from '../GetFeatureDetailsCommands/GetFeatureDetailsCommands.ts'
import { getFeatureDetailsTheme } from '../GetFeatureDetailsTheme/GetFeatureDetailsTheme.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFeatureDetailsHandler = (featureName: string): FeatureDetailsHandler => {
  switch (featureName) {
    case InputName.Commands:
      return getFeatureDetailsCommand
    default:
      return getFeatureDetailsTheme
  }
}
