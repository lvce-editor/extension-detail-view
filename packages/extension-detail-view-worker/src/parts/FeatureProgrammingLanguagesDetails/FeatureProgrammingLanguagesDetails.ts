import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const getProgrammingLanguagesDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  // Programming languages feature doesn't need to store additional state
  return {}
}
