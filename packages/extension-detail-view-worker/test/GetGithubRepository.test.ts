import { expect, test } from '@jest/globals'
import { getGithubRepository } from '../src/parts/GetGithubRepository/GetGithubRepository.ts'

test('parses a GitHub repository string', () => {
  expect(getGithubRepository({ repository: 'https://github.com/owner/repository' })).toEqual({ owner: 'owner', repository: 'repository' })
})

test('parses a git+ GitHub repository object and removes .git', () => {
  expect(getGithubRepository({ repository: { type: 'git', url: 'git+https://github.com/owner/repository.git' } })).toEqual({
    owner: 'owner',
    repository: 'repository',
  })
})

test.each([
  undefined,
  null,
  {},
  { repository: null },
  { repository: {} },
  { repository: 42 },
  { repository: 'http://github.com/owner/repository' },
  { repository: 'https://gitlab.com/owner/repository' },
  { repository: 'https://user@github.com/owner/repository' },
  { repository: 'https://github.com:444/owner/repository' },
  { repository: 'https://github.com/owner' },
  { repository: 'https://github.com/owner/repository/releases' },
  { repository: 'https://github.com/owner/repo%2Fother' },
  { repository: 'not a url' },
])('rejects a non-public GitHub repository URL: %p', (extension) => {
  expect(getGithubRepository(extension)).toBeUndefined()
})
