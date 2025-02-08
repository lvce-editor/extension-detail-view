import { expect, test } from '@jest/globals'
import * as RenderMarkdown from '../src/parts/RenderMarkdown/RenderMarkdown.ts'

test.skip('heading', async () => {
  const content = `# Test`
  expect(await RenderMarkdown.renderMarkdown(content)).toBe('<h1>Test</h1>\n')
})
