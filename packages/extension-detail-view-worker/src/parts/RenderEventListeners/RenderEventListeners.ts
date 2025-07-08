import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleIconError,
      params: ['handleIconError'],
    },
    {
      name: DomEventListenerFunctions.HandleReadmeContextMenu,
      params: ['handleReadmeContextMenu', 'event.clientX', 'event.clientY', 'event.target.href', 'event.target.src'],
    },
    {
      name: DomEventListenerFunctions.HandleReadmeWheel,
      params: ['handleWheel', 'event.deltaX', 'event.deltaY'],
    },
    {
      name: DomEventListenerFunctions.HandleTabsClick,
      params: ['handleTabsClick', 'event.target.name'],
    },
    {
      name: DomEventListenerFunctions.HandleFeaturesClick,
      params: ['handleFeaturesClick', 'event.target.name'],
    },
    {
      name: DomEventListenerFunctions.HandleClickSize,
      params: ['handleClickSize', 'event.target.name'],
    },
    {
      name: DomEventListenerFunctions.HandleClickDisable,
      params: ['handleClickDisable'],
    },
    {
      name: DomEventListenerFunctions.HandleClickScrollToTop,
      params: ['handleClickScrollToTop'],
    },
    {
      name: DomEventListenerFunctions.HandleClickSettings,
      params: ['handleClickSettings'],
    },
    {
      name: DomEventListenerFunctions.HandleClickUninstall,
      params: ['handleClickUninstall'],
    },
    {
      name: DomEventListenerFunctions.HandleClickSetColorTheme,
      params: ['handleClickSetColorTheme'],
    },
  ]
}
