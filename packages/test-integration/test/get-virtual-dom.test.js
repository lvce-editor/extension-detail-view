import { expect, test } from '@jest/globals'
import { setup } from '../src/test.js'

test('render-markdown', async () => {
  const rpc = await setup()
  const sanitizedReadme =
    '<h1 id="theme-atom-one-dark">Theme Atom One Dark</h1>\n<p><img src="/remote/home/simon/Documents/levivilet/lvce-editor/extensions/builtin.theme-atom-one-dark/./images/demo.png" alt="demo"></p>\n<h2 id="gitpod">Gitpod</h2>\n<p><a href="https://gitpod.io/#https://github.com/lvce-editor/theme-atom-one-dark"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod"></a></p>\n'
  const extensionDetail = {
    name: 'Atom One Dark Theme',
    uri: 'extension-detail://builtin.theme-atom-one-dark',
    x: 0,
    y: 55,
    width: 639,
    height: 409,
    size: 2,
    uid: 6,
    sanitizedReadmeHtml: sanitizedReadme,
    iconSrc: '/icons/theme-icon.png',
    description: 'One Dark Theme based on Atom',
  }
  const result = await rpc.invoke('ExtensionDetail.getVirtualDom', extensionDetail, sanitizedReadme)
  expect(result).toEqual([])
})
