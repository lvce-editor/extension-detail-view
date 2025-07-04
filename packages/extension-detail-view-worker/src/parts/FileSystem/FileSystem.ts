import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const readFile = async (uri: string): Promise<string> => {
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    const response = await fetch(uri)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const result = await response.text()
    return result
  }
  return RendererWorker.readFile(uri)
}
