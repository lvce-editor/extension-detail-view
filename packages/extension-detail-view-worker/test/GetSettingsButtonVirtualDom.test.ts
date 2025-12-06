import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetSettingsButtonVirtualDom from '../src/parts/GetSettingsButtonVirtualDom/GetSettingsButtonVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('returns settings button virtual dom when enabled', () => {
  expect(GetSettingsButtonVirtualDom.getSettingsButtonVirtualDom(true)).toEqual([
    {
      childCount: 1,
      className: ClassNames.SettingsButton,
      name: InputName.Settings,
      onClick: 6,
      title: 'Settings',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: ClassNames.SettingsIcon,
      text: '⚙️',
      type: VirtualDomElements.Span,
    },
  ])
})

test('returns empty array when settings button is disabled', () => {
  expect(GetSettingsButtonVirtualDom.getSettingsButtonVirtualDom(false)).toEqual([])
})
