import { expect, test } from '@jest/globals'
import { getProgrammingLanguageTableEntry } from '../src/parts/GetProgrammingLanguageTableEntry/GetProgrammingLanguageTableEntry.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('getProgrammingLanguageTableEntry returns correct structure with all properties', () => {
  const programmingLanguage = {
    id: 'javascript',
    extensions: ['.js', '.jsx'],
    configuration: {},
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
      type: TableCellType.CodeList,
      value: '',
      listItems: ['.js', '.jsx'],
    },
    {
      type: TableCellType.CheckMark,
      value: '',
      checked: true,
    },
    {
      type: TableCellType.CheckMark,
      value: '',
      checked: false,
    },
  ])
})

test('getProgrammingLanguageTableEntry with configuration false', () => {
  const programmingLanguage = {
    id: 'typescript',
    extensions: ['.ts', '.tsx'],
    configuration: null,
    snippets: {},
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[3]).toEqual({
    type: TableCellType.CheckMark,
    value: '',
    checked: false,
  })
})

test('getProgrammingLanguageTableEntry with snippets false', () => {
  const programmingLanguage = {
    id: 'python',
    extensions: ['.py'],
    configuration: {},
    snippets: null,
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[4]).toEqual({
    type: TableCellType.CheckMark,
    value: '',
    checked: false,
  })
})

test('getProgrammingLanguageTableEntry with both configuration and snippets false', () => {
  const programmingLanguage = {
    id: 'html',
    extensions: ['.html'],
    configuration: null,
    snippets: null,
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[3].checked).toBe(false)
  expect(result[4].checked).toBe(false)
})

test('getProgrammingLanguageTableEntry with empty extensions array', () => {
  const programmingLanguage = {
    id: 'css',
    extensions: [],
    configuration: {},
    snippets: {},
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[2]).toEqual({
    type: TableCellType.CodeList,
    value: '',
    listItems: [],
  })
})

test('getProgrammingLanguageTableEntry with single extension', () => {
  const programmingLanguage = {
    id: 'json',
    extensions: ['.json'],
    configuration: {},
    snippets: {},
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[2].listItems).toEqual(['.json'])
})

test('getProgrammingLanguageTableEntry with multiple extensions', () => {
  const programmingLanguage = {
    id: 'markdown',
    extensions: ['.md', '.markdown', '.mdown'],
    configuration: {},
    snippets: {},
  }
  const result = getProgrammingLanguageTableEntry(programmingLanguage)

  expect(result[2].listItems).toEqual(['.md', '.markdown', '.mdown'])
})

test('getProgrammingLanguageTableEntry name is always empty string', () => {
  const programmingLanguage1 = {
    id: 'lang1',
    extensions: [],
    configuration: {},
    snippets: {},
  }
  const programmingLanguage2 = {
    id: 'lang2',
    extensions: [],
    configuration: {},
    snippets: {},
  }
  const result1 = getProgrammingLanguageTableEntry(programmingLanguage1)
  const result2 = getProgrammingLanguageTableEntry(programmingLanguage2)

  expect(result1[1].value).toBe('')
  expect(result2[1].value).toBe('')
})

test('getProgrammingLanguageTableEntry with falsy configuration values', () => {
  const programmingLanguage1 = {
    id: 'lang1',
    extensions: [],
    configuration: false,
    snippets: {},
  }
  const programmingLanguage2 = {
    id: 'lang2',
    extensions: [],
    configuration: 0,
    snippets: {},
  }
  const programmingLanguage3 = {
    id: 'lang3',
    extensions: [],
    configuration: '',
    snippets: {},
  }

  expect(getProgrammingLanguageTableEntry(programmingLanguage1)[3].checked).toBe(false)
  expect(getProgrammingLanguageTableEntry(programmingLanguage2)[3].checked).toBe(false)
  expect(getProgrammingLanguageTableEntry(programmingLanguage3)[3].checked).toBe(false)
})

test('getProgrammingLanguageTableEntry with truthy configuration values', () => {
  const programmingLanguage1 = {
    id: 'lang1',
    extensions: [],
    configuration: {},
    snippets: {},
  }
  const programmingLanguage2 = {
    id: 'lang2',
    extensions: [],
    configuration: [],
    snippets: {},
  }
  const programmingLanguage3 = {
    id: 'lang3',
    extensions: [],
    configuration: 1,
    snippets: {},
  }

  expect(getProgrammingLanguageTableEntry(programmingLanguage1)[3].checked).toBe(true)
  expect(getProgrammingLanguageTableEntry(programmingLanguage2)[3].checked).toBe(true)
  expect(getProgrammingLanguageTableEntry(programmingLanguage3)[3].checked).toBe(true)
})
