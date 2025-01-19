import type { Feature } from '../Feature/Feature.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFeatures = (): readonly Feature[] => {
  const features: readonly Feature[] = [
    {
      id: InputName.Theme,
      label: 'Theme',
      selected: true,
    },
    {
      id: InputName.Commands,
      label: 'Commands',
      selected: false,
    },
    {
      id: InputName.JsonValidation,
      label: 'Json Validation',
      selected: false,
    },
    {
      id: InputName.ProgrammingLanguages,
      label: 'Programming Languages',
      selected: false,
    },
    {
      id: InputName.Settings,
      label: 'Settings',
      selected: false,
    },
  ]
  return features
}
