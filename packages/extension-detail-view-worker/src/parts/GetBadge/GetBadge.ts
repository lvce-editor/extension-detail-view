import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const getBadge = (extension: any, state: ExtensionDetailState): string => {
  if (extension?.builtin && state.builtinExtensionsBadgeEnabled) {
    return 'builtin'
  }
  return ''
}