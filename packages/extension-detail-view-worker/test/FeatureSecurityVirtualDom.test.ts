import { expect, test } from '@jest/globals'
import { getSecurityVirtualDom } from '../src/parts/FeatureSecurityVirtualDom/FeatureSecurityVirtualDom.ts'
import * as GetSecurityVirtualDom from '../src/parts/GetSecurityVirtualDom/GetSecurityVirtualDom.ts'

test('returns security virtual dom for the extension', () => {
  const state = { extension: { browser: 'main.js', isolated: true } }

  expect(getSecurityVirtualDom(state)).toEqual(GetSecurityVirtualDom.getSecurityVirtualDom(state.extension))
})
