import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const getFeatureDetailsActivationEvents = (extension: any): Partial<ExtensionDetailState> => {
  const activationEvents = extension.activation || []

  return {
    activationEvents,
  }
}
