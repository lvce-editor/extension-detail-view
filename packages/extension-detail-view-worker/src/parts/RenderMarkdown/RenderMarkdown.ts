import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const renderMarkdown = async (markdown: string, options: { readonly baseUrl?: string } = {}): Promise<string> => {
  const html = await RendererWorker.renderMarkdown(markdown, options)
  return html
}
