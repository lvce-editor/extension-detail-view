import type { FeatureState } from '../FeatureState/FeatureState.ts'
import { getActivationEntries } from '../GetActivationEntries/GetActivationEntries.ts'

export type FeatureActivationEventsState = FeatureState<'activationEntries' | 'activationEvents'>

export const getActivationEventsDetails = async (extension: any): Promise<FeatureActivationEventsState> => {
  const activationEvents = extension.activation || []
  const activationEntries = getActivationEntries(activationEvents)
  return {
    activationEntries,
    activationEvents,
  }
}
