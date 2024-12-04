import * as marked from 'marked'

export const renderMarkdown = async (markdown: string, options: { baseUrl?: string } = {}): Promise<string> => {
  const html = await marked.marked(markdown, {})
  return html
}
