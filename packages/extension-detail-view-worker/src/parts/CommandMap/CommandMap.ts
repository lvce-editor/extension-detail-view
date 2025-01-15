import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'
import * as GetMenuEntries from '../GetMenuEntries/GetMenuEntries.ts'
import * as HandleIconError from '../HandleIconError/HandleIconError.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'ExtensionDetail.getMenuEntries': GetMenuEntries.getMenuEntries,
  'ExtensionDetail.getVirtualDom': GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom,
  'ExtensionDetail.loadContent': LoadContent.loadContent,
  'ExtensionDetail.terminate': Terminate.terminate,
  'HandleIconError.handleIconError': HandleIconError.handleIconError,
  'RenderMarkdown.renderMarkdown': RenderMarkdown.renderMarkdown,
}
