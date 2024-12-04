import { expect, test } from '@jest/globals'
import * as GetViewletSize from '../src/parts/GetViewletSize/GetViewletSize.ts'
import * as ViewletSize from '../src/parts/ViewletSize/ViewletSize.ts'

test('small size when width is less than 180', () => {
  expect(GetViewletSize.getViewletSize(100)).toBe(ViewletSize.Small)
  expect(GetViewletSize.getViewletSize(179)).toBe(ViewletSize.Small)
})

test('normal size when width is between 180 and 768', () => {
  expect(GetViewletSize.getViewletSize(180)).toBe(ViewletSize.Normal)
  expect(GetViewletSize.getViewletSize(500)).toBe(ViewletSize.Normal)
  expect(GetViewletSize.getViewletSize(767)).toBe(ViewletSize.Normal)
})

test('large size when width is 768 or greater', () => {
  expect(GetViewletSize.getViewletSize(768)).toBe(ViewletSize.Large)
  expect(GetViewletSize.getViewletSize(1000)).toBe(ViewletSize.Large)
})
