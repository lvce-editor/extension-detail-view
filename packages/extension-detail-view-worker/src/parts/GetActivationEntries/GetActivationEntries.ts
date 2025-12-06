import type { ActivationEntry } from '../ActivationEntry/ActivationEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

const getActivationEntry = (value: unknown): ActivationEntry => {
  if (typeof value !== 'string') {
    return {
      errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
      isValid: false,
      stringValue: JSON.stringify(value),
    }
  }
  if (!value) {
    return {
      errorMessage: ExtensionDetailStrings.stringMustNotBeEmpty(),
      isValid: false,
      stringValue: '',
    }
  }
  return {
    errorMessage: '',
    isValid: true,
    stringValue: value,
  }
}

export const getActivationEntries = (activation: readonly unknown[]): readonly ActivationEntry[] => {
  return activation.map(getActivationEntry)
}
