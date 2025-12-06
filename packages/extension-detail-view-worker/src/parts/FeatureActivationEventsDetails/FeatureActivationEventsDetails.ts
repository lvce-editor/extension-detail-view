import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getActivationEntries } from '../GetActivationEntries/GetActivationEntries.ts'

export const getActivationEventsDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const activationEvents = extension.activation || []
  const activationEntries = getActivationEntries(activationEvents)
  return {
    activationEntries,
    activationEvents,
  }
}
