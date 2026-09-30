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
  [
    '    await electronApp.close();',
    `${trace('electron-close-start')}\n    console.log('[teardown] child-state', electronApp.process().exitCode, electronApp.process().signalCode);\n    electronApp.process().once('exit', (code, signal) => console.log('[teardown] child-exit', Date.now(), code, signal));\n    electronApp.process().once('close', (code, signal) => console.log('[teardown] child-close', Date.now(), code, signal));\n    electronApp.once('close', () => console.log('[teardown] electron-close-event', Date.now()));\n    await electronApp.close();\n${trace('electron-close-complete')}`,
  ],
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

await patch('node_modules/playwright-core/lib/coreBundle.js', [
  [
    '          const electronHandle = await this._nodeElectronHandlePromise;\n          await electronHandle.evaluate(({ app }) => app.quit()).catch(() => {\n          });\n          this._nodeConnection.close();\n          await appClosePromise;',
    `${trace('pw-quit-start')}\n          const electronHandle = await this._nodeElectronHandlePromise;\n          await electronHandle.evaluate(({ app }) => app.quit()).catch(() => {});\n${trace('pw-quit-returned')}\n          this._nodeConnection.close();\n${trace('pw-node-connection-closed')}\n          await appClosePromise;\n${trace('pw-app-close-resolved')}`,
  ],
])
