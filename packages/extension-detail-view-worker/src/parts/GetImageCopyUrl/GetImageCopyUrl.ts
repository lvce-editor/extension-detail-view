export const getImageCopyUrl = (iconSrc: string, locationProtocol: string, locationHost: string): string => {
  const prefix = `${locationProtocol}//${locationHost}`
  const absoluteIconSrc = `${prefix}${iconSrc}`
  return absoluteIconSrc
}
