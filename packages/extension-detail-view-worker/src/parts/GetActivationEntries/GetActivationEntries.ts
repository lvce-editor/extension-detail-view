import type { ActivationEntry } from '../ActivationEntry/ActivationEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

const getActivationEntry = (value: any): ActivationEntry => {
  if (typeof value !== 'string') {
    return {
      isValid: false,
      stringValue: JSON.stringify(value),
      errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
    }
  }
  if (!value) {
    return {
      isValid: false,
      stringValue: '',
      errorMessage: ExtensionDetailStrings.stringMustNotBeEmpty(),
    }
  }
  return {
    isValid: true,
    stringValue: value,
    errorMessage: '',
  }
}

export const getActivationEntries = (activation: readonly any[]): readonly ActivationEntry[] => {
  return activation.map(getActivationEntry)
}
