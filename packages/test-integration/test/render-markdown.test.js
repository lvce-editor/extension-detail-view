import { expect, test } from '@jest/globals'
import { setup } from '../src/test.js'

test('render-markdown', async () => {
  const rpc = await setup()
  const content = '# Test'
  const result = await rpc.invoke('RenderMarkdown.renderMarkdown', content)
  expect(result).toBe('<h1>Test</h1>\n')
})
