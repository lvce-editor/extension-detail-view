import * as Icon from '../Icon/Icon.ts'
import * as IsLanguageBasicsExtension from '../IsLanguageBasicsExtension/IsLanguageBasicsExtension.ts'
import * as IsThemeExtension from '../IsThemeExtension/IsThemeExtension.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getIcon = (extension: any, platform: number, assetDir: string): string => {
  if (!extension) {
    return Icon.extensionDefaultIcon(assetDir)
  }
  if (!extension.path || !extension.icon) {
    if (IsLanguageBasicsExtension.isLanguageBasicsExtension(extension)) {
      return Icon.extensionLanguageBasics(assetDir)
    }
    if (IsThemeExtension.isThemeExtension(extension)) {
      return Icon.extensionTheme(assetDir)
    }
    return Icon.extensionDefaultIcon(assetDir)
  }
  if (platform === PlatformType.Remote || platform === PlatformType.Electron) {
    if (extension.builtin) {
      return `${assetDir}/extensions/${extension.id}/${extension.icon}`
    }
    return `/remote/${extension.path}/${extension.icon}` // TODO support windows paths
  }
  return ''
}
