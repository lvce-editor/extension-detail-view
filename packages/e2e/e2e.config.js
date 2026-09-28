import { defineConfig } from '@lvce-editor/test-with-playwright'

export default defineConfig({
  onlyExtension: '.',
  testPath: '.',
  serverPath: '../server/src/startServer.js',
  reusePage: true,
})
