import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 515_000

export const instantiations = 12000

export const instantiationsPath = join(root, 'packages', 'extension-detail-view-worker')

export const workerPath = join(root, '.tmp/dist/dist/extensionDetailViewWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../e2e/node_modules/playwright/index.mjs')
