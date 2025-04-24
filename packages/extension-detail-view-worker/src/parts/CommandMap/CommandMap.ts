import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Dispose from '../Dispose/Dispose.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetExtensionDetailVirtualDom2 from '../GetExtensionDetailVirtualDom2/GetExtensionDetailVirtualDom2.ts'
import * as GetMenuEntries from '../GetMenuEntries/GetMenuEntries.ts'
import * as HandleClickDisable from '../HandleClickDisable/HandleClickDisable.ts'
import * as HandleClickFeatures from '../HandleClickFeatures/HandleClickFeatures.ts'
import * as HandleClickSize from '../HandleClickSize/HandleClickSize.ts'
import * as HandleClickUninstall from '../HandleClickUninstall/HandleClickUninstall.ts'
import * as HandleIconError from '../HandleIconError/HandleIconError.ts'
import * as HandleTabsClick from '../HandleTabsClick/HandleTabsClick.ts'
import * as LoadContent2 from '../LoadContent2/LoadContent2.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as Resize from '../Resize/Resize.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SelectTab from '../SelectTab/SelectTab.ts'
import * as Terminate from '../Terminate/Terminate.ts'
import * as WrapCommand from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const commandMap = {
  'ExtensionDetail.create': Create.create,
  'ExtensionDetail.diff2': Diff2.diff2,
  'ExtensionDetail.dispose': Dispose.dispose,
  'ExtensionDetail.getCommandIds': GetCommandIds.getCommandIds,
  'ExtensionDetail.getMenuEntries': GetMenuEntries.getMenuEntries,
  'ExtensionDetail.handleClickDisable': WrapCommand.wrapCommand(HandleClickDisable.handleClickDisable),
  'ExtensionDetail.handleClickSize': WrapCommand.wrapCommand(HandleClickSize.handleClickSize),
  'ExtensionDetail.handleClickUninstall': WrapCommand.wrapCommand(HandleClickUninstall.handleClickUninstall),
  'ExtensionDetail.handleFeaturesClick': WrapCommand.wrapCommand(HandleClickFeatures.handleClickFeatures),
  'ExtensionDetail.handleIconError': WrapCommand.wrapCommand(HandleIconError.handleIconError),
  'ExtensionDetail.handleTabsClick': WrapCommand.wrapCommand(HandleTabsClick.handleTabsClick),
  'ExtensionDetail.loadContent2': WrapCommand.wrapCommand(LoadContent2.loadContent2),
  'ExtensionDetail.render2': Render2.render2,
  'ExtensionDetail.renderEventListeners': RenderEventListeners.renderEventListeners,
  'ExtensionDetail.resize': Resize.resize,
  'ExtensionDetail.saveState': SaveState.saveState,
  'ExtensionDetail.selectTab': WrapCommand.wrapCommand(SelectTab.selectTab),
  'ExtensionDetail.terminate': Terminate.terminate,

  // deprecated
  'ExtensionDetail.getVirtualDom2': GetExtensionDetailVirtualDom2.getExtensionDetailVirtualDom2,
  'ExtensionDetail.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
}
