import { expect, test } from '@jest/globals'
import { setup } from '../src/test.js'

test.skip('render-markdown - error - content is not of type string', async () => {
  const rpc = await setup()
  const content = undefined
  await expect(rpc.invoke('RenderMarkdown.renderMarkdown', content)).rejects.toThrow(
    new Error(`marked(): input parameter is undefined or null
Please report this to https://github.com/markedjs/marked.`),
  )
}, 10_000)
