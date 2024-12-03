import * as GetRemoteSrc from '../GetRemoteSrc/GetRemoteSrc.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getBaseUrl = (extensionPath: string, platform: number): string => {
  switch (platform) {
    case PlatformType.Remote:
    case PlatformType.Electron:
      return GetRemoteSrc.getRemoteSrc(extensionPath + '/')
    default:
      return extensionPath
  }
}
