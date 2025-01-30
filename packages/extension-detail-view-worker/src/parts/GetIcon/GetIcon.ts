import * as AssetDir from '../AssetDir/AssetDir.ts'
import * as Icon from '../Icon/Icon.ts'
import * as IsLanguageBasicsExtension from '../IsLanguageBasicsExtension/IsLanguageBasicsExtension.ts'
import * as IsThemeExtension from '../IsThemeExtension/IsThemeExtension.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getIcon = (extension: any, platform: number): string => {
  // TODO make it dynamic
  const {assetDir} = AssetDir
  if (!extension) {
    return Icon.ExtensionDefaultIcon
  }
  if (!extension.path || !extension.icon) {
    if (IsLanguageBasicsExtension.isLanguageBasicsExtension(extension)) {
      return Icon.extensionLanguageBasics(AssetDir.assetDir)
    }
    if (IsThemeExtension.isThemeExtension(extension)) {
      return Icon.extensionTheme(AssetDir.assetDir)
    }
    return Icon.extensionDefaultIcon(AssetDir.assetDir)
  }
  if (platform === PlatformType.Remote || platform === PlatformType.Electron) {
    if (extension.builtin) {
      return `${assetDir}/extensions/${extension.id}/${extension.icon}`
    }
    return `/remote/${extension.path}/${extension.icon}` // TODO support windows paths
  }
  return ''
}
