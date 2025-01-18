import * as AssetDir from '../AssetDir/AssetDir.ts'
import * as Icon from '../Icon/Icon.ts'
import * as IsLanguageBasicsExtension from '../IsLanguageBasicsExtension/IsLanguageBasicsExtension.ts'
import * as IsThemeExtension from '../IsThemeExtension/IsThemeExtension.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getIcon = (extension: any, platform: number): string => {
  if (!extension) {
    return Icon.ExtensionDefaultIcon
  }
  if (!extension.path || !extension.icon) {
    if (IsLanguageBasicsExtension.isLanguageBasicsExtension(extension)) {
      return Icon.ExtensionLanguageBasics
    }
    if (IsThemeExtension.isThemeExtension(extension)) {
      return Icon.ExtensionTheme
    }
    return Icon.ExtensionDefaultIcon
  }
  if (platform === PlatformType.Remote || platform === PlatformType.Electron) {
    if (extension.builtin) {
      return `${AssetDir.assetDir}/extensions/${extension.id}/${extension.icon}`
    }
    return `/remote/${extension.path}/${extension.icon}` // TODO support windows paths
  }
  return ''
}
