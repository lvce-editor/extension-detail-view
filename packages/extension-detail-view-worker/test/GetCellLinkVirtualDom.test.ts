import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getCellLinkVirtualDom } from '../src/parts/GetCellLinkVirtualDom/GetCellLinkVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getCellLinkVirtualDom returns correct structure with href only', () => {
  const value: string = 'Click here'
  const props: { readonly href: string } = { href: 'https://example.com' }
  const result = getCellLinkVirtualDom(value, props)

  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    {
      childCount: 1,
      className: ClassNames.Link,
      href: 'https://example.com',
      type: VirtualDomElements.A,
    },
    text('Click here'),
  ])
})

test('getCellLinkVirtualDom includes className when provided', () => {
  const value: string = 'Link text'
  const props: { readonly className: string; readonly href: string } = {
    className: 'CustomClass',
    href: 'https://example.com',
  }
  const result = getCellLinkVirtualDom(value, props)

  expect(result[0]).toEqual({
    childCount: 1,
    className: `${ClassNames.TableCell} CustomClass`,
    type: VirtualDomElements.Td,
  })
})

test('getCellLinkVirtualDom includes title when provided', () => {
  const value: string = 'Link text'
  const props: { readonly title: string; readonly href: string } = {
    href: 'https://example.com',
    title: 'Tooltip text',
  }
  const result = getCellLinkVirtualDom(value, props)

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.TableCell,
    title: 'Tooltip text',
    type: VirtualDomElements.Td,
  })
})

test('getCellLinkVirtualDom includes both className and title when provided', () => {
  const value: string = 'Link text'
  const props: {
    readonly className: string
    readonly title: string
    readonly href: string
  } = {
    className: 'CustomClass',
    href: 'https://example.com',
    title: 'Tooltip text',
  }
  const result = getCellLinkVirtualDom(value, props)

  expect(result[0]).toEqual({
    childCount: 1,
    className: `${ClassNames.TableCell} CustomClass`,
    title: 'Tooltip text',
    type: VirtualDomElements.Td,
  })
})

test('getCellLinkVirtualDom works without props', () => {
  const value: string = 'Link text'
  const result = getCellLinkVirtualDom(value)

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.TableCell,
    type: VirtualDomElements.Td,
  })
  expect(result[1]).toEqual({
    childCount: 1,
    className: ClassNames.Link,
    href: undefined,
    type: VirtualDomElements.A,
  })
  expect(result[2]).toEqual(text('Link text'))
})

test('getCellLinkVirtualDom uses correct href value', () => {
  const value: string = 'GitHub'
  const props: { readonly href: string } = { href: 'https://github.com' }
  const result = getCellLinkVirtualDom(value, props)

  expect(result[1]).toEqual({
    childCount: 1,
    className: ClassNames.Link,
    href: 'https://github.com',
    type: VirtualDomElements.A,
  })
})

test('getCellLinkVirtualDom structure is correct', () => {
  const value: string = 'Test link'
  const props: { readonly href: string } = { href: 'https://test.com' }
  const result = getCellLinkVirtualDom(value, props)

  expect(result.length).toBe(3)
  expect(result[0].type).toBe(VirtualDomElements.Td)
  expect(result[1].type).toBe(VirtualDomElements.A)
  expect(result[2]).toEqual(text('Test link'))
})

test('getCellLinkVirtualDom does not include title when not provided', () => {
  const value: string = 'Link'
  const props: { readonly href: string } = { href: 'https://example.com' }
  const result = getCellLinkVirtualDom(value, props)

  expect(result[0].title).toBeUndefined()
})
