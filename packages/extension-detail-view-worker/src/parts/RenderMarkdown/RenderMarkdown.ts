import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const renderMarkdown = async (markdown: string, options: { readonly baseUrl?: string } = {}): Promise<string> => {
  // @ts-ignore todo
  const html = await RendererWorker.invoke('Markdown.renderMarkdown', markdown, options)
  return html
}
