import type { ActivationEntry } from '../ActivationEntry/ActivationEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetActivationEventSuggestion from '../GetActivationEventSuggestion/GetActivationEventSuggestion.ts'

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
  const suggestion = GetActivationEventSuggestion.getActivationEventSuggestion(value)
  if (suggestion) {
    return {
      errorMessage: ExtensionDetailStrings.invalidActivationEventWithSuggestion(value, suggestion),
      isValid: false,
      stringValue: value,
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
