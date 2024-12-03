import * as marked from 'marked'

export const renderMarkdown = async (markdown: string) => {
  const html = await marked.marked(markdown, {})
  return html
}
