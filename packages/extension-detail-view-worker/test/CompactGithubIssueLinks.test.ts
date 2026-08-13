import { expect, test } from '@jest/globals'
import { compactGithubIssueLinks } from '../src/parts/CompactGithubIssueLinks/CompactGithubIssueLinks.ts'

test('compacts GitHub pull request links', () => {
  const html =
    '<a target="_blank" rel="noreferrer noopener nofollow" href="https://github.com/lvce-editor/eslint/pull/82">https://github.com/lvce-editor/eslint/pull/82</a>'
  expect(compactGithubIssueLinks(html)).toBe(
    '<a target="_blank" rel="noreferrer noopener nofollow" href="https://github.com/lvce-editor/eslint/pull/82">#82</a>',
  )
})

test('compacts GitHub issue links', () => {
  const html = '<a href="https://github.com/lvce-editor/eslint/issues/42">https://github.com/lvce-editor/eslint/issues/42</a>'
  expect(compactGithubIssueLinks(html)).toBe('<a href="https://github.com/lvce-editor/eslint/issues/42">#42</a>')
})

test('compacts multiple GitHub issue links', () => {
  const html = [82, 83]
    .map((issueNumber) => {
      const url = `https://github.com/lvce-editor/eslint/pull/${issueNumber}`
      return `<a href="${url}">${url}</a>`
    })
    .join(' ')
  expect(compactGithubIssueLinks(html)).toBe(
    '<a href="https://github.com/lvce-editor/eslint/pull/82">#82</a> <a href="https://github.com/lvce-editor/eslint/pull/83">#83</a>',
  )
})

test('keeps custom link labels', () => {
  const html = '<a href="https://github.com/lvce-editor/eslint/pull/82">ESLint worker change</a>'
  expect(compactGithubIssueLinks(html)).toBe(html)
})

test('keeps non-GitHub links', () => {
  const html = '<a href="https://example.com/issues/42">https://example.com/issues/42</a>'
  expect(compactGithubIssueLinks(html)).toBe(html)
})
