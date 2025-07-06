import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSettingsButtonVirtualDom from '../src/parts/GetSettingsButtonVirtualDom/GetSettingsButtonVirtualDom.ts'

test('returns settings button virtual dom when enabled', () => {
  expect(GetSettingsButtonVirtualDom.getSettingsButtonVirtualDom(true)).toEqual([
    {
      type: VirtualDomElements.Button,
      className: ClassNames.SettingsButton,
      onClick: DomEventListenerFunctions.HandleClickSettings,
      childCount: 1,
      title: 'Settings',
    },
    {
      type: VirtualDomElements.Span,
      className: ClassNames.SettingsIcon,
      childCount: 0,
      text: '⚙️',
    },
  ])
})

test('returns empty array when settings button is disabled', () => {
  expect(GetSettingsButtonVirtualDom.getSettingsButtonVirtualDom(false)).toEqual([])
})
