import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetSettingsButtonVirtualDom from '../src/parts/GetSettingsButtonVirtualDom/GetSettingsButtonVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('returns settings button virtual dom when enabled', () => {
  expect(GetSettingsButtonVirtualDom.getSettingsButtonVirtualDom(true)).toEqual([
    {
      ariaHasPopup: 'menu',
      ariaLabel: 'Settings',
      childCount: 1,
      className: 'IconButton SettingsButton',
      name: InputName.Settings,
      onClick: 6,
      title: 'Settings',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconSettingsGear',
      type: VirtualDomElements.Span,
    },
  ])
})

test('returns empty array when settings button is disabled', () => {
  expect(GetSettingsButtonVirtualDom.getSettingsButtonVirtualDom(false)).toEqual([])
})
