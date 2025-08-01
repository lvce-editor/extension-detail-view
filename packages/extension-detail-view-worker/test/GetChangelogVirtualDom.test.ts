import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetChangelogVirtualDom from '../src/parts/GetChangelogVirtualDom/GetChangelogVirtualDom.ts'

test('changelog virtual dom', () => {
  expect(GetChangelogVirtualDom.getChangelogVirtualDom([])).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Changelog,
      childCount: 1,
    },
  ])
})
