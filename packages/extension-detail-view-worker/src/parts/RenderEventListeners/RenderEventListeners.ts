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
      name: DomEventListenerFunctions.HandleClickUninstall,
      params: ['handleClickUninstall'],
    },
  ]
}
