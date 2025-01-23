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
import * as WrapCommand from '../WrapCommand/WrapCommand.ts'

export const commandMap = {
  'ExtensionDetail.create': Create.create,
  'ExtensionDetail.getMenuEntries': GetMenuEntries.getMenuEntries,
  'ExtensionDetail.getVirtualDom': WrapCommand.wrapCommand(GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom),
  'ExtensionDetail.handleClickDisable': WrapCommand.wrapCommand(HandleClickDisable.handleClickDisable),
  'ExtensionDetail.handleClickSize': WrapCommand.wrapCommand(HandleClickSize.handleClickSize),
  'ExtensionDetail.handleClickUninstall': WrapCommand.wrapCommand(HandleClickUninstall.handleClickUninstall),
  'ExtensionDetail.handleFeaturesClick': WrapCommand.wrapCommand(HandleClickFeatures.handleClickFeatures),
  'ExtensionDetail.handleIconError': WrapCommand.wrapCommand(HandleIconError.handleIconError),
  'ExtensionDetail.handleTabsClick': WrapCommand.wrapCommand(HandleTabsClick.handleTabsClick),
  'ExtensionDetail.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'ExtensionDetail.saveState': SaveState.saveState,
  'ExtensionDetail.selectTab': WrapCommand.wrapCommand(SelectTab.selectTab),
  'ExtensionDetail.terminate': Terminate.terminate,
  'ExtensionDetail.resize': Resize.resize,

  // deprecated
  'HandleIconError.handleIconError': HandleIconError.handleIconError,
  'RenderMarkdown.renderMarkdown': RenderMarkdown.renderMarkdown,
}
