import { measureMemory } from '@lvce-editor/measure-memory'
import { join } from 'node:path'
import { root } from './root.ts'

const threshold = 636_000

const instantiations = 16000

const instantiationsPath = join(root, 'packages', 'extension-detail-view-worker')

const workerPath = join(root, '.tmp/dist/dist/extensionDetailViewWorkerMain.js')

const playwrightPath = import.meta.resolve('../../../node_modules/playwright/index.mjs')

await measureMemory({
  playwrightPath,
  workerPath,
  threshold,
  instantiations,
  instantiationsPath,
})
