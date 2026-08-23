import type { FeatureState } from '../FeatureState/FeatureState.ts'

export type FeatureSecurityState = FeatureState<'extension'>

export const getSecurityDetails = async (extension: any): Promise<FeatureSecurityState> => {
  return { extension }
}
