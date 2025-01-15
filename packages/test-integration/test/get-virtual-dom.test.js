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
  expect(result).toEqual([
    {
      childCount: 2,
      className: 'Viewlet ExtensionDetail',
      type: 4,
    },
    {
      childCount: 2,
      className: 'ExtensionDetailHeader',
      type: 4,
    },
    {
      alt: '',
      childCount: 0,
      className: 'ExtensionDetailIcon',
      draggable: false,
      src: '/icons/theme-icon.png',
      type: 17,
    },
    {
      childCount: 2,
      className: 'ExtensionDetailHeaderDetails',
      type: 4,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailName',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Atom One Dark Theme',
      type: 12,
    },
    {
      childCount: 1,
      className: 'ExtensionDetailDescription',
      type: 4,
    },
    {
      childCount: 0,
      text: 'One Dark Theme based on Atom',
      type: 12,
    },
    {
      childCount: 8,
      className: 'Markdown',
      onContextMenu: 'handleReadmeContextMenu',
      role: 'document',
      type: 4,
    },
    {
      childCount: 1,
      id: 'theme-atom-one-dark',
      type: 5,
    },
    {
      childCount: 0,
      text: 'Theme Atom One Dark',
      type: 12,
    },
    {
      childCount: 0,
      text: '\n',
      type: 12,
    },
    {
      childCount: 1,
      type: 50,
    },
    {
      alt: 'demo',
      childCount: 0,
      src: '/remote/home/simon/Documents/levivilet/lvce-editor/extensions/builtin.theme-atom-one-dark/./images/demo.png',
      type: 17,
    },
    {
      childCount: 0,
      text: '\n',
      type: 12,
    },
    {
      childCount: 1,
      id: 'gitpod',
      type: 22,
    },
    {
      childCount: 0,
      text: 'Gitpod',
      type: 12,
    },
    {
      childCount: 0,
      text: '\n',
      type: 12,
    },
    {
      childCount: 1,
      type: 50,
    },
    {
      childCount: 1,
      href: 'https://gitpod.io/#https://github.com/lvce-editor/theme-atom-one-dark',
      type: 53,
    },
    {
      alt: 'Open in Gitpod',
      childCount: 0,
      src: 'https://gitpod.io/button/open-in-gitpod.svg',
      type: 17,
    },
    {
      childCount: 0,
      text: '\n',
      type: 12,
    },
  ])
})
