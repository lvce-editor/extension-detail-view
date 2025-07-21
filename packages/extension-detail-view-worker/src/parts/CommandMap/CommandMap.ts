import { terminate } from '@lvce-editor/viewlet-registry'
import * as CopyImage from '../CopyImage/CopyImage.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Dispose from '../Dispose/Dispose.ts'
import * as WrapCommand from '../ExtensionDetailStates/ExtensionDetailStates.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetMenuEntries from '../GetMenuEntries/GetMenuEntries.ts'
import * as GetMenus from '../GetMenus/GetMenus.ts'
import * as HandleClickCategory from '../HandleClickCategory/HandleClickCategory.ts'
import * as HandleClickDisable from '../HandleClickDisable/HandleClickDisable.ts'
import * as HandleClickFeatures from '../HandleClickFeatures/HandleClickFeatures.ts'
import * as HandleClickScrollToTop from '../HandleClickScrollToTop/HandleClickScrollToTop.ts'
import * as HandleClickSetColorTheme from '../HandleClickSetColorTheme/HandleClickSetColorTheme.ts'
import * as HandleClickSettings from '../HandleClickSettings/HandleClickSettings.ts'
import * as HandleClickSize from '../HandleClickSize/HandleClickSize.ts'
import * as HandleClickUninstall from '../HandleClickUninstall/HandleClickUninstall.ts'
import * as HandleIconError from '../HandleIconError/HandleIconError.ts'
import { handleImageContextMenu } from '../HandleImageContextMenu/HandleImageContextMenu.ts'
import * as HandleScroll from '../HandleScroll/HandleScroll.ts'
import * as HandleTabsClick from '../HandleTabsClick/HandleTabsClick.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as LoadContent2 from '../LoadContent2/LoadContent2.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as Resize from '../Resize/Resize.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SelectTab from '../SelectTab/SelectTab.ts'

export const commandMap = {
  'ExtensionDetail.copyImage': WrapCommand.wrapCommand(CopyImage.copyImage),
  'ExtensionDetail.getMenus': GetMenus.getMenus,
  'ExtensionDetail.create': Create.create,
  'ExtensionDetail.diff2': Diff2.diff2,
  'ExtensionDetail.dispose': Dispose.dispose,
  'ExtensionDetail.getCommandIds': GetCommandIds.getCommandIds,
  'ExtensionDetail.getMenuEntries': GetMenuEntries.getMenuEntries,
  'ExtensionDetail.handleClickCategory': WrapCommand.wrapCommand(HandleClickCategory.handleClickCategory),
  'ExtensionDetail.handleClickDisable': WrapCommand.wrapCommand(HandleClickDisable.handleClickDisable),
  'ExtensionDetail.handleClickScrollToTop': WrapCommand.wrapCommand(HandleClickScrollToTop.handleClickScrollToTop),
  'ExtensionDetail.handleClickSetColorTheme': WrapCommand.wrapCommand(HandleClickSetColorTheme.handleClickSetColorTheme),
  'ExtensionDetail.handleClickSettings': WrapCommand.wrapCommand(HandleClickSettings.handleClickSettings),
  'ExtensionDetail.handleClickSize': WrapCommand.wrapCommand(HandleClickSize.handleClickSize),
  'ExtensionDetail.handleClickUninstall': WrapCommand.wrapCommand(HandleClickUninstall.handleClickUninstall),
  'ExtensionDetail.handleFeaturesClick': WrapCommand.wrapCommand(HandleClickFeatures.handleClickFeatures),
  'ExtensionDetail.handleIconError': WrapCommand.wrapCommand(HandleIconError.handleIconError),
  'ExtensionDetail.handleScroll': WrapCommand.wrapCommand(HandleScroll.handleScroll),
  'ExtensionDetail.handleTabsClick': WrapCommand.wrapCommand(HandleTabsClick.handleTabsClick),
  'ExtensionDetail.handleWheel': WrapCommand.wrapCommand(HandleScroll.handleScroll), // deprecated
  'ExtensionDetail.loadContent2': WrapCommand.wrapCommand(LoadContent2.loadContent2),
  'ExtensionDetail.render2': Render2.render2,
  'ExtensionDetail.renderEventListeners': RenderEventListeners.renderEventListeners,
  'ExtensionDetail.handleImageContextMenu': WrapCommand.wrapCommand(handleImageContextMenu),
  'ExtensionDetail.resize': WrapCommand.wrapCommand(Resize.resize),
  // @ts-ignore
  'ExtensionDetail.saveState': WrapCommand.wrapGetter(SaveState.saveState),
  'ExtensionDetail.selectTab': WrapCommand.wrapCommand(SelectTab.selectTab),
  'ExtensionDetail.terminate': terminate,
  'ExtensionDetail.initialize': Initialize.initialize,
}
