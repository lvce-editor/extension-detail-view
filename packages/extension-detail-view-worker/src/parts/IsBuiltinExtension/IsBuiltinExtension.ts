interface Extension {
  readonly builtin?: boolean
  readonly id?: string
  readonly isBuiltin?: boolean
}

export const isBuiltinExtension = (extension: Extension | null | undefined): boolean => {
  return Boolean(extension?.isBuiltin || extension?.builtin || extension?.id?.startsWith('builtin'))
}
