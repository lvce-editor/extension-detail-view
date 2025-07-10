import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetSettingsButtonVirtualDom from '../src/parts/GetSettingsButtonVirtualDom/GetSettingsButtonVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('returns settings button virtual dom when enabled', () => {
  expect(GetSettingsButtonVirtualDom.getSettingsButtonVirtualDom(true)).toEqual([
    {
      type: VirtualDomElements.Button,
      className: ClassNames.SettingsButton,
      onClick: 'handleClickSettings',
      childCount: 1,
      title: 'Settings',
      name: InputName.Settings,
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
