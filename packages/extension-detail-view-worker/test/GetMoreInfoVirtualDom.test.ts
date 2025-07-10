import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../src/parts/MoreInfoEntry/MoreInfoEntry.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMoreInfoVirtualDom from '../src/parts/GetMoreInfoVirtualDom/GetMoreInfoVirtualDom.ts'

test('more info virtual dom with entries', () => {
  const entries: readonly MoreInfoEntry[] = []
  expect(GetMoreInfoVirtualDom.getMoreInfoVirtualDom(entries)).toEqual([
    {
      type: VirtualDomElements.Dl,
      className: ClassNames.MoreInfo,
      childCount: 0,
    },
  ])
})
