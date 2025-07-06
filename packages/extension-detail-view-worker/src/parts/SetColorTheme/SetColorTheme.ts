import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const setColorTheme = (id: string): Promise<string> => {
  return RendererWorker.setColorTheme(id)
}
