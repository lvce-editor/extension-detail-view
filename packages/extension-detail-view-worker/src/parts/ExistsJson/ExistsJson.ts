import { existsFile } from '../ExistsFile/ExistsFile.ts'

export const existsJson = async (schemaUrl: string): Promise<boolean> => {
  if (!URL.canParse(schemaUrl)) {
    return false
  }
  const url = new URL(schemaUrl)
  const { protocol } = url
  if (protocol === 'file:') {
    return existsFile(schemaUrl)
  }
  if (protocol !== 'http:' && protocol !== 'https:') {
    return false
  }
  try {
    // TODO verify that response header is json
    const response = await fetch(schemaUrl, {
      method: 'HEAD',
    })
    return response.ok
  } catch {
    return false
  }
}
