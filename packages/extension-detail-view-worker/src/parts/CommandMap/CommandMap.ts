import * as Create from '../Create/Create.ts'
import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'
import * as GetMenuEntries from '../GetMenuEntries/GetMenuEntries.ts'
import * as HandleClickDisable from '../HandleClickDisable/HandleClickDisable.ts'
import * as HandleClickFeatures from '../HandleClickFeatures/HandleClickFeatures.ts'
import * as HandleClickSize from '../HandleClickSize/HandleClickSize.ts'
import * as HandleClickUninstall from '../HandleClickUninstall/HandleClickUninstall.ts'
import * as HandleIconError from '../HandleIconError/HandleIconError.ts'
import * as HandleTabsClick from '../HandleTabsClick/HandleTabsClick.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'
import * as Resize from '../Resize/Resize.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SelectTab from '../SelectTab/SelectTab.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'ExtensionDetail.create': Create.create,
  'ExtensionDetail.getMenuEntries': GetMenuEntries.getMenuEntries,
  'ExtensionDetail.getVirtualDom': GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom,
  'ExtensionDetail.handleClickDisable': HandleClickDisable.handleClickDisable,
  'ExtensionDetail.handleClickSize': HandleClickSize.handleClickSize,
  'ExtensionDetail.handleClickUninstall': HandleClickUninstall.handleClickUninstall,
  'ExtensionDetail.handleFeaturesClick': HandleClickFeatures.handleClickFeatures,
  'ExtensionDetail.handleIconError': HandleIconError.handleIconError,
  'ExtensionDetail.handleTabsClick': HandleTabsClick.handleTabsClick,
  'ExtensionDetail.loadContent': LoadContent.loadContent,
  'ExtensionDetail.saveState': SaveState.saveState,
  'ExtensionDetail.selectTab': SelectTab.selectTab,
  'ExtensionDetail.terminate': Terminate.terminate,
  'ExtensionDetail.resize': Resize.resize,

  // deprecated
  'HandleIconError.handleIconError': HandleIconError.handleIconError,
  'RenderMarkdown.renderMarkdown': RenderMarkdown.renderMarkdown,
}
