import { existsFile } from '../ExistsFile/ExistsFile.ts'

export const existsJson = async (schemaUrl: string): Promise<boolean> => {
  let url: URL
  try {
    url = new URL(schemaUrl)
  } catch {
    return false
  }
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
