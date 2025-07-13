import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const getActivationEventsDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const activationEvents = extension.activation || []
  return {
    activationEvents,
  }
}
