import { test } from '@jest/globals'
import { setup } from '../src/test.js'

test.skip('open-detail-view', async () => {
  const rpc = await setup()
  const uid = 1
  const x = 0
  const y = 0
  const width = 0
  const height = 0
  const workspacePath = ''
  const assetDir = ''
  const itemHeight = 22
  const value = ''
  const replacement = ''
  await rpc.invoke('TextSearch.create', uid, x, y, width, height, workspacePath, assetDir, itemHeight, value, replacement)
})
