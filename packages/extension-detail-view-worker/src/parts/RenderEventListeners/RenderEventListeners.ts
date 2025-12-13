import { EventExpression } from '@lvce-editor/constants'
import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleAdditionalDetailContextMenu,
      params: ['handleAdditionalDetailsContextMenu', EventExpression.ClientX, EventExpression.ClientY, 'event.target.nodeName', 'event.target.href'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleClickCategory,
      params: ['handleClickCategory', EventExpression.TargetName],
    },
    {
      name: DomEventListenerFunctions.HandleIconError,
      params: ['handleIconError'],
    },
    {
      name: DomEventListenerFunctions.HandleReadmeContextMenu,
      params: ['handleReadmeContextMenu', EventExpression.ClientX, EventExpression.ClientY, 'event.target.nodeName', EventExpression.TargetHref],
    },
    {
      name: DomEventListenerFunctions.HandleImageContextMenu,
      params: ['handleImageContextMenu', EventExpression.ClientX, EventExpression.ClientY],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleReadmeScroll,
      params: ['handleScroll', 'event.target.scrollTop', InputSource.User],
      passive: true,
    },
    {
      name: DomEventListenerFunctions.HandleTabsClick,
      params: ['handleTabsClick', EventExpression.TargetName],
    },
    {
      name: DomEventListenerFunctions.HandleFeaturesClick,
      params: ['handleFeaturesClick', EventExpression.TargetName],
    },
    {
      name: DomEventListenerFunctions.HandleClickSize,
      params: ['handleClickSize', EventExpression.TargetName],
    },
    {
      name: DomEventListenerFunctions.HandleClickDisable,
      params: ['handleClickDisable'],
    },
    {
      name: DomEventListenerFunctions.HandleClickScrollToTop,
      params: ['handleClickScrollToTop'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleClickSettings,
      params: ['handleClickSettings'],
    },
    {
      name: DomEventListenerFunctions.HandleReadmeClick,
      params: ['handleReadmeClick', 'event.target.nodeName', 'event.target.href'],
      preventDefault: true,
    },
    {
      name: DomEventListenerFunctions.HandleClickUninstall,
      params: ['handleClickUninstall'],
    },
    {
      name: DomEventListenerFunctions.HandleClickSetColorTheme,
      params: ['handleClickSetColorTheme'],
    },
    {
      name: DomEventListenerFunctions.HandleSelectionChange,
      params: ['handleSelectionChange'],
    },
  ]
}
