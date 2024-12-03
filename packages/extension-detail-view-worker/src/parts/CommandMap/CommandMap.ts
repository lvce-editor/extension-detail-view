import * as GetMenuEntries from '../GetMenuEntries/GetMenuEntries.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const commandMap = {
  'RenderMarkdown.renderMarkdown': RenderMarkdown.renderMarkdown,
  'ExtensionDetail.loadContent': LoadContent.loadContent,
  'ExtensionDetail.getMenuEntries': GetMenuEntries.getMenuEntries,
}
