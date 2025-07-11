import * as MarkdownWorker from '../MarkdownWorker/MarkdownWorker.ts'

export const renderMarkdown = async (markdown: string, options: { readonly baseUrl?: string } = {}): Promise<string> => {
  const html = await MarkdownWorker.render(markdown, options)
  return html
}
