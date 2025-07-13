export class ExtensionNotFoundError extends Error {
  constructor(extensionId: string) {
    super(`extension not found: ${extensionId}`)
    this.name = 'ExtensionNotFoundError'
  }
}