export const createCss = (object: Record<string, number>): string => {
  const inner = Object.entries(object)
    .map(([key, value]) => `  --${key}: ${value}px;`)
    .join('\n')
  const full = `:root {\n${inner}\n}`
  return full
}
