import { expect, test } from '@jest/globals'
import { getProgrammingLanguageTableEntry } from '../src/parts/GetProgrammingLanguageTableEntry/GetProgrammingLanguageTableEntry.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('getProgrammingLanguageTableEntry returns correct structure with all properties', () => {
  const programmingLanguage = {
    configuration: {},
    extensions: ['.js', '.jsx'],
    id: 'javascript',
    snippets: {},
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result).toEqual([
    {
      type: TableCellType.Text,
      value: 'javascript',
    },
    {
      type: TableCellType.Text,
      value: '',
    },
    {
      listItems: ['.js', '.jsx'],
      type: TableCellType.CodeList,
      value: '',
    },
    {
      checked: true,
      type: TableCellType.CheckMark,
      value: '',
    },
    {
      checked: false,
      type: TableCellType.CheckMark,
      value: '',
    },
  ])
})

test('getProgrammingLanguageTableEntry with configuration false', () => {
  const programmingLanguage = {
    configuration: null,
    extensions: ['.ts', '.tsx'],
    id: 'typescript',
    snippets: {},
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[3]).toEqual({
    checked: false,
    type: TableCellType.CheckMark,
    value: '',
  })
})

test('getProgrammingLanguageTableEntry with snippets false', () => {
  const programmingLanguage = {
    configuration: {},
    extensions: ['.py'],
    id: 'python',
    snippets: null,
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[4]).toEqual({
    checked: false,
    type: TableCellType.CheckMark,
    value: '',
  })
})

test('getProgrammingLanguageTableEntry with both configuration and snippets false', () => {
  const programmingLanguage = {
    configuration: null,
    extensions: ['.html'],
    id: 'html',
    snippets: null,
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[3].checked).toBe(false)
  expect(result[4].checked).toBe(false)
})

test('getProgrammingLanguageTableEntry with empty extensions array', () => {
  const programmingLanguage = {
    configuration: {},
    extensions: [],
    id: 'css',
    snippets: {},
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[2]).toEqual({
    listItems: [],
    type: TableCellType.CodeList,
    value: '',
  })
})

test('getProgrammingLanguageTableEntry with single extension', () => {
  const programmingLanguage = {
    configuration: {},
    extensions: ['.json'],
    id: 'json',
    snippets: {},
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[2].listItems).toEqual(['.json'])
})

test('getProgrammingLanguageTableEntry with multiple extensions', () => {
  const programmingLanguage = {
    configuration: {},
    extensions: ['.md', '.markdown', '.mdown'],
    id: 'markdown',
    snippets: {},
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[2].listItems).toEqual(['.md', '.markdown', '.mdown'])
})

test('getProgrammingLanguageTableEntry name is always empty string', () => {
  const programmingLanguage1 = {
    configuration: {},
    extensions: [],
    id: 'lang1',
    snippets: {},
  }
  const programmingLanguage2 = {
    configuration: {},
    extensions: [],
    id: 'lang2',
    snippets: {},
  }
  const result1 = getProgrammingLanguageTableEntry(programmingLanguage1)
  const result2 = getProgrammingLanguageTableEntry(programmingLanguage2)

  expect(result1[1].value).toBe('')
  expect(result2[1].value).toBe('')
})

test('getProgrammingLanguageTableEntry with falsy configuration values', () => {
  const programmingLanguage1 = {
    configuration: false,
    extensions: [],
    id: 'lang1',
    snippets: {},
  }
  const programmingLanguage2 = {
    configuration: 0,
    extensions: [],
    id: 'lang2',
    snippets: {},
  }
  const programmingLanguage3 = {
    configuration: '',
    extensions: [],
    id: 'lang3',
    snippets: {},
  }

  expect(getProgrammingLanguageTableEntry(programmingLanguage1)[3].checked).toBe(false)
  expect(getProgrammingLanguageTableEntry(programmingLanguage2)[3].checked).toBe(false)
  expect(getProgrammingLanguageTableEntry(programmingLanguage3)[3].checked).toBe(false)
})

test('getProgrammingLanguageTableEntry with truthy configuration values', () => {
  const programmingLanguage1 = {
    configuration: {},
    extensions: [],
    id: 'lang1',
    snippets: {},
  }
  const programmingLanguage2 = {
    configuration: [],
    extensions: [],
    id: 'lang2',
    snippets: {},
  }
  const programmingLanguage3 = {
    configuration: 1,
    extensions: [],
    id: 'lang3',
    snippets: {},
  }

  expect(getProgrammingLanguageTableEntry(programmingLanguage1)[3].checked).toBe(true)
  expect(getProgrammingLanguageTableEntry(programmingLanguage2)[3].checked).toBe(true)
  expect(getProgrammingLanguageTableEntry(programmingLanguage3)[3].checked).toBe(true)
})
