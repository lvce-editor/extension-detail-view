import { expect, test } from '@jest/globals'
import * as RenderEventListeners from '../src/parts/RenderEventListeners/RenderEventListeners.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'

test('renderEventListeners returns expected event listeners', () => {
  const result = RenderEventListeners.renderEventListeners()

  expect(result).toEqual([
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
  ])
})

test('renderEventListeners returns array', () => {
  const result = RenderEventListeners.renderEventListeners()
  expect(result).toBeInstanceOf(Array)
})

test('renderEventListeners returns correct number of event listeners', () => {
  const result = RenderEventListeners.renderEventListeners()
  expect(result).toHaveLength(12)
})