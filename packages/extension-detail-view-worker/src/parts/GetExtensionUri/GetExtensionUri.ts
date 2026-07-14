import * as PlatformType from '../PlatformType/PlatformType.ts'

export const getExtensionUri = (uri: string, platform: number, origin: string): string => {
  if (platform !== PlatformType.Web || !uri) {
    return uri
  }
  return new URL(uri, origin).href
}
