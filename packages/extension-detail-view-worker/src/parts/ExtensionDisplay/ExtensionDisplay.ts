import * as AssetDir from '../AssetDir/AssetDir.js'
// @ts-ignore
import * as GetRemoteSrc from '../GetRemoteSrc/GetRemoteSrc.js'
import * as Icon from '../Icon/Icon.js'
import * as Platform from '../Platform/Platform.js'
import * as PlatformType from '../PlatformType/PlatformType.ts'

const isLanguageBasicsExtension = (extension) => {
  return extension.name && extension.name.startsWith('Language Basics')
}

const isThemeExtension = (extension) => {
  return extension.name && extension.name.endsWith(' Theme')
}

export const getIcon = (extension) => {
  if (!extension) {
    return Icon.ExtensionDefaultIcon
  }
  if (!extension.path || !extension.icon) {
    if (isLanguageBasicsExtension(extension)) {
      return Icon.ExtensionLanguageBasics
    }
    if (isThemeExtension(extension)) {
      return Icon.ExtensionTheme
    }
    return Icon.ExtensionDefaultIcon
  }
  if (Platform.platform === PlatformType.Remote || Platform.platform === PlatformType.Electron) {
    if (extension.builtin) {
      return `${AssetDir.assetDir}/extensions/${extension.id}/${extension.icon}`
    }
    return `/remote/${extension.path}/${extension.icon}` // TODO support windows paths
  }
  return ''
}

// TODO handle case when extension is of type number|array|null|string

export const getName = (extension) => {
  if (extension && extension.name) {
    return extension.name
  }
  if (extension && extension.id) {
    return extension.id
  }
  return 'n/a'
}

export const getDescription = (extension) => {
  if (!extension || !extension.description) {
    return 'n/a'
  }
  return extension.description
}
