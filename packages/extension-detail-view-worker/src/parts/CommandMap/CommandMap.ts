import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'

export const commandMap = {
  'RenderMarkdown.renderMarkdown': RenderMarkdown.renderMarkdown,
  'ExtensionDetail.loadContent': LoadContent.loadContent,
}
