import { expect, test } from '@jest/globals'
import * as HandleTabsClick from '../src/parts/HandleTabsClick/HandleTabsClick.ts'

test.skip('handles tabs click - details tab', async () => {
  const state = {
    selectedTab: 'Features',
    extensionDetail: {
      name: 'Test Extension',
    },
    sanitizedReadmeHtml: '<h1>Test</h1>',
  } as any
  expect(await HandleTabsClick.handleTabsClick(state, 'Details')).toEqual({
    ...state,
    selectedTab: 'Details',
  })
})

test.skip('handles tabs click - features tab', async () => {
  const state = {
    selectedTab: 'Details',
    extensionDetail: {
      name: 'Test Extension',
    },
    sanitizedReadmeHtml: '<h1>Test</h1>',
  } as any
  expect(await HandleTabsClick.handleTabsClick(state, 'Features')).toEqual({
    ...state,
    selectedTab: 'Features',
  })
})

test.skip('handles tabs click - changelog tab', async () => {
  const state = {
    selectedTab: 'Details',
    extensionDetail: {
      name: 'Test Extension',
    },
    sanitizedReadmeHtml: '<h1>Test</h1>',
  } as any
  expect(await HandleTabsClick.handleTabsClick(state, 'Changelog')).toEqual({
    ...state,
    selectedTab: 'Changelog',
  })
})
