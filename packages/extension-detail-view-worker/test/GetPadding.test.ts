import { expect, test } from '@jest/globals'
import * as GetPadding from '../src/parts/GetPadding/GetPadding.ts'

test('padding: below 600', () => {
  expect(GetPadding.getPadding(599)).toBe(10)
})

test('padding: 600-799 fixed 10', () => {
  expect(GetPadding.getPadding(600)).toBe(10)
  expect(GetPadding.getPadding(799)).toBe(10)
})

test('padding: 800 exactly', () => {
  expect(GetPadding.getPadding(800)).toBe(10)
})

test('padding: fluid between 800 and 1200', () => {
  expect(GetPadding.getPadding(900)).toBe(15)
  expect(GetPadding.getPadding(1000)).toBe(20)
  expect(GetPadding.getPadding(1100)).toBe(25)
  expect(GetPadding.getPadding(1199)).toBe(30)
})

test('padding: 1200 and above', () => {
  expect(GetPadding.getPadding(1200)).toBe(30)
  expect(GetPadding.getPadding(1600)).toBe(30)
})

test('getSideBarWidth: below 490 returns 0', () => {
  expect(GetPadding.getSideBarWidth(0)).toBe(0)
  expect(GetPadding.getSideBarWidth(100)).toBe(0)
  expect(GetPadding.getSideBarWidth(489)).toBe(0)
})

test('getSideBarWidth: at 490 threshold', () => {
  const result: number = GetPadding.getSideBarWidth(490)
  expect(result).toBeGreaterThan(0)
})

test('getSideBarWidth: 490-649 range', () => {
  const width490: number = GetPadding.getSideBarWidth(490)
  const width500: number = GetPadding.getSideBarWidth(500)
  const width600: number = GetPadding.getSideBarWidth(600)
  const width649: number = GetPadding.getSideBarWidth(649)

  expect(width490).toBeGreaterThan(0)
  expect(width500).toBeGreaterThan(width490)
  expect(width600).toBeGreaterThan(width500)
  expect(width649).toBeGreaterThan(0)
})

test('getSideBarWidth: 650-799 range', () => {
  const width650: number = GetPadding.getSideBarWidth(650)
  const width700: number = GetPadding.getSideBarWidth(700)
  const width750: number = GetPadding.getSideBarWidth(750)
  const width799: number = GetPadding.getSideBarWidth(799)

  expect(width650).toBeGreaterThan(0)
  expect(width700).toBeGreaterThan(width650)
  expect(width750).toBeGreaterThan(width700)
  expect(width799).toBeGreaterThan(0)
})

test('getSideBarWidth: 800 and above', () => {
  const width800: number = GetPadding.getSideBarWidth(800)
  const width1000: number = GetPadding.getSideBarWidth(1000)
  const width1200: number = GetPadding.getSideBarWidth(1200)
  const width1600: number = GetPadding.getSideBarWidth(1600)

  expect(width800).toBeGreaterThan(0)
  expect(width1000).toBeGreaterThan(width800)
  expect(width1200).toBeGreaterThan(width1000)
  expect(width1600).toBeGreaterThan(width1200)
})

test('getSideBarWidth: returns Math.max of formula and width/4', () => {
  const width500: number = GetPadding.getSideBarWidth(500)
  const width1000: number = GetPadding.getSideBarWidth(1000)

  const formula500: number = 175 + Math.round(20 * (500 / 100))
  const widthOverFour500: number = Math.round(500 / 4)
  expect(width500).toBe(Math.max(formula500, widthOverFour500))

  const formula1000: number = 175 + Math.round(20 * (1000 / 100))
  const widthOverFour1000: number = Math.round(1000 / 4)
  expect(width1000).toBe(Math.max(formula1000, widthOverFour1000))
})

test('getSideBarWidth: edge cases', () => {
  expect(GetPadding.getSideBarWidth(488)).toBe(0)
  expect(GetPadding.getSideBarWidth(490)).toBeGreaterThan(0)
  expect(GetPadding.getSideBarWidth(649)).toBeGreaterThan(0)
  expect(GetPadding.getSideBarWidth(650)).toBeGreaterThan(0)
  expect(GetPadding.getSideBarWidth(799)).toBeGreaterThan(0)
  expect(GetPadding.getSideBarWidth(800)).toBeGreaterThan(0)
})
