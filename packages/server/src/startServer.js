import { join } from 'node:path'

process.argv.push('--link', join(import.meta.dirname, '../../../.tmp/dist'))

await import('@lvce-editor/server/bin/server.js')
