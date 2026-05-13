import { RendererWorker } from '@lvce-editor/rpc-registry'

const getThemeFromPreferences = (preferences: any): string => {
  if (!preferences || typeof preferences !== 'object') {
    return ''
  }
  const workbenchTheme = preferences['workbench.colorTheme']
  if (typeof workbenchTheme === 'string') {
    return workbenchTheme
  }
  const legacyTheme = preferences['workbnech.colorTheme']
  if (typeof legacyTheme === 'string') {
    return legacyTheme
  }
  return ''
}

export const getCurrentColorTheme = async (): Promise<string> => {
  const setting = await RendererWorker.getPreference('workbench.colorTheme')
  if (typeof setting === 'string' && setting) {
    return setting
  }
  try {
    const preferences = await RendererWorker.getAllPreferences()
    const theme = getThemeFromPreferences(preferences)
    if (theme) {
      return theme
    }
  } catch {
    // ignore and fall back to legacy key lookup
  }
  const legacySetting = await RendererWorker.getPreference('workbnech.colorTheme')
  if (typeof legacySetting === 'string') {
    return legacySetting
  }
  return ''
}
