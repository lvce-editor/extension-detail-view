export const getImageCopyUrl = (iconSrc: string, locationProtocol: string, locationHost: string): string => {
  if (!iconSrc) {
    return ''
  }
  const prefix = `${locationProtocol}//${locationHost}`
  const absoluteIconSrc = `${prefix}${iconSrc}`
  return absoluteIconSrc
}
