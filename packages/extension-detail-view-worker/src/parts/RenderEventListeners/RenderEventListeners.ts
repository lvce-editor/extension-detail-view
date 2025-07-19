import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleClickCategory,
      params: ['handleClickCategory', 'event.target.name'],
    },
    {
      name: DomEventListenerFunctions.HandleIconError,
      params: ['handleIconError'],
    },
    {
      name: DomEventListenerFunctions.HandleReadmeContextMenu,
      params: ['handleReadmeContextMenu', 'event.clientX', 'event.clientY', 'event.target.href', 'event.target.src'],
    },
    {
      name: DomEventListenerFunctions.HandleReadmeScroll,
      params: ['handleScroll', 'event.target.scrollTop', InputSource.User],
      passive: true,
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
      preventDefault: true,
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
