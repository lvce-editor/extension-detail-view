import { expect, test } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ViewletSize from '../src/parts/ViewletSize/ViewletSize.ts'
import * as ViewletSizeMap from '../src/parts/ViewletSizeMap/ViewletSizeMap.ts'

test('maps small size to small class name', () => {
  expect(ViewletSizeMap.getClassNames(ViewletSize.Small)).toBe(ClassNames.Small)
})

test('maps normal size to normal class name', () => {
  expect(ViewletSizeMap.getClassNames(ViewletSize.Normal)).toBe(ClassNames.Normal)
})

test('maps large size to large class name', () => {
  expect(ViewletSizeMap.getClassNames(ViewletSize.Large)).toBe(ClassNames.Large)
})

test('returns empty string for invalid size', () => {
  expect(ViewletSizeMap.getClassNames(-1)).toBe('')
  expect(ViewletSizeMap.getClassNames(0)).toBe('')
  expect(ViewletSizeMap.getClassNames(999)).toBe('')
})

test('handles undefined size', () => {
  // @ts-expect-error
  expect(ViewletSizeMap.getClassNames(undefined)).toBe('')
})

test('handles null size', () => {
  // @ts-expect-error
  expect(ViewletSizeMap.getClassNames(null)).toBe('')
})
