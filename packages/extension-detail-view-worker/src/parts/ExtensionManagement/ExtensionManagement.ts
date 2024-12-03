import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as SharedProcess from '../SharedProcess/SharedProcess.js'

const getAllExtensions = async () => {
  if (Platform.platform === PlatformType.Web) {
    return []
  }
  return SharedProcess.invoke(/* ExtensionManagement.getAllExtensions */ 'ExtensionManagement.getAllExtensions')
}

export const getExtension = async (id) => {
  const allExtensions = await getAllExtensions()
  for (const extension of allExtensions) {
    if (extension.id === id) {
      return extension
    }
  }
  return undefined
}
