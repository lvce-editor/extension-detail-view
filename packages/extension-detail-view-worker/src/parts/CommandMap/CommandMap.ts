import * as Create from '../Create/Create.ts'
import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'
import * as GetMenuEntries from '../GetMenuEntries/GetMenuEntries.ts'
import * as HandleIconError from '../HandleIconError/HandleIconError.ts'
import * as HandleTabsClick from '../HandleTabsClick/HandleTabsClick.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SelectTab from '../SelectTab/SelectTab.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'ExtensionDetail.create': Create.create,
  'ExtensionDetail.saveState': SaveState.saveState,
  'ExtensionDetail.getMenuEntries': GetMenuEntries.getMenuEntries,
  'ExtensionDetail.getVirtualDom': GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom,
  'ExtensionDetail.loadContent': LoadContent.loadContent,
  'ExtensionDetail.terminate': Terminate.terminate,
  'ExtensionDetail.handleTabsClick': HandleTabsClick.handleTabsClick,
  'ExtensionDetail.handleIconError': HandleIconError.handleIconError,
  'ExtensionDetail.selectTab': SelectTab.selectTab,

  // deprecated
  'HandleIconError.handleIconError': HandleIconError.handleIconError,
  'RenderMarkdown.renderMarkdown': RenderMarkdown.renderMarkdown,
}
