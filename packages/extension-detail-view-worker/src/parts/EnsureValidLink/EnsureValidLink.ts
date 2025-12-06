export const ensureValidLink = (link: string): string => {
  if (!link) {
    return ''
  }
  try {
    const parsed = new URL(link)
    if (parsed.protocol !== 'https:') {
      return ''
    }
    return link
  } catch {
    return ''
  }
}
