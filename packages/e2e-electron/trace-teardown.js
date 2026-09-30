import { readFile, writeFile } from 'node:fs/promises'

const patch = async (path, replacements) => {
  let source = await readFile(path, 'utf8')
  for (const [before, after] of replacements) {
    if (source.split(before).length !== 2) {
      throw new Error(`Expected one teardown trace target: ${before}`)
    }
    source = source.replace(before, after)
  }
  await writeFile(path, source)
}
const trace = (stage) => `console.log('[teardown] ${stage}', Date.now(), process.getActiveResourcesInfo());`
await patch('node_modules/@lvce-editor/test-with-playwright-worker/dist/workerMain.js', [
  ['    await electronApp.close();', `${trace('electron-close-start')}\n    await electronApp.close();\n${trace('electron-close-complete')}`],
  [
    '  await rm(userDataDir, {\n    force: true,\n    recursive: true\n  });',
    `${trace('profile-remove-start')}\n  await rm(userDataDir, {\n    force: true,\n    recursive: true\n  });\n${trace('profile-remove-complete')}`,
  ],
  [
    '    await rpc.invoke(HandleFinalResult, finalResult);',
    `await rpc.invoke(HandleFinalResult, finalResult);\n${trace('final-result-acknowledged')}`,
  ],
])
await patch('node_modules/@lvce-editor/test-with-playwright/dist/main.js', [
  [
    '  await rpc.invoke(RunAllTests, onlyExtension, testPath, cwd, browser, headless, timeout, runtimeOptions, traceFocus, filter, reusePage, svgScreenshotOptions, coverage, traceRendererWorker);\n  await rpc.dispose();',
    `await rpc.invoke(RunAllTests, onlyExtension, testPath, cwd, browser, headless, timeout, runtimeOptions, traceFocus, filter, reusePage, svgScreenshotOptions, coverage, traceRendererWorker);\n${trace('run-all-tests-returned')}\nawait rpc.dispose();\n${trace('worker-disposed')}`,
  ],
  [
    '    await this._rawIpc.terminate();',
    `${trace('worker-terminate-start')}\n    await this._rawIpc.terminate();\n${trace('worker-terminate-complete')}`,
  ],
])
