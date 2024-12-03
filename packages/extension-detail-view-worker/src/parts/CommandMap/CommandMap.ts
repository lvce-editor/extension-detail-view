import * as HandleIconError from '../HandleIconError/HandleIconError.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'

export const commandMap = {
  'RenderMarkdown.renderMarkdown': RenderMarkdown.renderMarkdown,
  'HandleIconError.handleIconError': HandleIconError.handleIconError,
  'ExtensionDetail.loadContent': LoadContent.loadContent,
}
