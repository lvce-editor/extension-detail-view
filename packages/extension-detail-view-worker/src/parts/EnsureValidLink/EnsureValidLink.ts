export const ensureValidLink = (link: string): string => {
  if (!link) {
    return ''
  }
  if (!URL.canParse(link)) {
    return ''
  }
  const parsed = new URL(link)
  if (parsed.protocol !== 'https:') {
    return ''
  }
  return link
}
