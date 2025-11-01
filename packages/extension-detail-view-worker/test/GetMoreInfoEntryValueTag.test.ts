import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getMoreInfoEntryValueTag } from '../src/parts/GetMoreInfoEntryValueTag/GetMoreInfoEntryValueTag.ts'

test('returns A tag when onClick is string', () => {
  const result: number = getMoreInfoEntryValueTag('onClick', undefined)
  expect(result).toBe(VirtualDomElements.A)
})

test('returns A tag when onClick is number', () => {
  const result: number = getMoreInfoEntryValueTag(123, undefined)
  expect(result).toBe(VirtualDomElements.A)
})

test('returns A tag when onClick is non-zero number', () => {
  const result: number = getMoreInfoEntryValueTag(1, undefined)
  expect(result).toBe(VirtualDomElements.A)
})

test('returns Code tag when onClick is undefined and code is true', () => {
  const result: number = getMoreInfoEntryValueTag(undefined, true)
  expect(result).toBe(VirtualDomElements.Code)
})

test('returns Code tag when onClick is 0 and code is true', () => {
  const result: number = getMoreInfoEntryValueTag(0, true)
  expect(result).toBe(VirtualDomElements.Code)
})

test('returns Code tag when onClick is empty string and code is true', () => {
  const result: number = getMoreInfoEntryValueTag('', true)
  expect(result).toBe(VirtualDomElements.Code)
})

test('returns Dd tag when both onClick and code are undefined', () => {
  const result: number = getMoreInfoEntryValueTag(undefined, undefined)
  expect(result).toBe(VirtualDomElements.Dd)
})

test('returns Dd tag when onClick is 0 and code is false', () => {
  const result: number = getMoreInfoEntryValueTag(0, false)
  expect(result).toBe(VirtualDomElements.Dd)
})

test('returns Dd tag when onClick is empty string and code is false', () => {
  const result: number = getMoreInfoEntryValueTag('', false)
  expect(result).toBe(VirtualDomElements.Dd)
})

test('prefers onClick over code when both are truthy', () => {
  const result: number = getMoreInfoEntryValueTag('onClick', true)
  expect(result).toBe(VirtualDomElements.A)
})
