export const getImageCopyUrl = (iconSrc: string): string => {
  // TODO support gitpod url prefixes
  // @ts-ignore
  const prefix = `${location.protocol}//${location.host}`
  const absoluteIconSrc = `${prefix}${iconSrc}`
  return absoluteIconSrc
}
