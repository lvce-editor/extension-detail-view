import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'
import * as GetMenuEntries from '../GetMenuEntries/GetMenuEntries.ts'
import * as HandleIconError from '../HandleIconError/HandleIconError.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const commandMap = {
  'RenderMarkdown.renderMarkdown': RenderMarkdown.renderMarkdown,
  'HandleIconError.handleIconError': HandleIconError.handleIconError,
  'ExtensionDetail.loadContent': LoadContent.loadContent,
  'ExtensionDetail.getMenuEntries': GetMenuEntries.getMenuEntries,
  'ExtensionDetail.getVirtualDom': GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom,
}
