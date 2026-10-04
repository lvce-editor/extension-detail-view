import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

const gitpodHost = 'gitpod.io'
const fallbackBaseUrl = 'https://lvce-editor.invalid'

const isGitpodImage = (src: unknown): boolean => {
  if (typeof src !== 'string') {
    return false
  }
  if (!URL.canParse(src, fallbackBaseUrl)) {
    return false
  }
  const { hostname } = new URL(src, fallbackBaseUrl)
  return hostname === gitpodHost || hostname.endsWith(`.${gitpodHost}`)
}

export const getMarkdownImageErrorMessage = (src: unknown): string => {
  if (isGitpodImage(src)) {
    return ExtensionDetailStrings.gitpodImageFailedToLoad()
  }
  return ExtensionDetailStrings.imageCannotBeLoaded()
}
