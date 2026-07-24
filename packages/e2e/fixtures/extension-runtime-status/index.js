export const activate = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 20)
  })
  vscode.registerCommand({
    id: 'runtimeStatus.activate',
    execute() {},
  })
}
