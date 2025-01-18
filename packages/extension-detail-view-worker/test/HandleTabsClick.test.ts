import { expect, test } from '@jest/globals'
import * as HandleTabsClick from '../src/parts/HandleTabsClick/HandleTabsClick.ts'

test('handles tabs click - details tab', () => {
  const state = {
    selectedTab: 'Features',
    extensionDetail: {
      name: 'Test Extension',
    },
    sanitizedReadmeHtml: '<h1>Test</h1>',
  } as any
  expect(HandleTabsClick.handleTabsClick(state, 'Details')).toEqual({
    ...state,
    selectedTab: 'Details',
  })
})

test('handles tabs click - features tab', () => {
  const state = {
    selectedTab: 'Details',
    extensionDetail: {
      name: 'Test Extension',
    },
    sanitizedReadmeHtml: '<h1>Test</h1>',
  } as any
  expect(HandleTabsClick.handleTabsClick(state, 'Features')).toEqual({
    ...state,
    selectedTab: 'Features',
  })
})

test('handles tabs click - changelog tab', () => {
  const state = {
    selectedTab: 'Details',
    extensionDetail: {
      name: 'Test Extension',
    },
    sanitizedReadmeHtml: '<h1>Test</h1>',
  } as any
  expect(HandleTabsClick.handleTabsClick(state, 'Changelog')).toEqual({
    ...state,
    selectedTab: 'Changelog',
  })
})
