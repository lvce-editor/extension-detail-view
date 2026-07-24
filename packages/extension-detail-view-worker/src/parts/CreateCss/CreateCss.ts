const mapEntry=([key, value])=>{
  return  `  --${key}: ${value}px;`

}
export const createCss = (object: Record<string, number>): string => {
  const inner = Object.entries(object)
    .map(mapEntry)
    .join('\n')
  const full = `:root {\n${inner}\n}`
  return full
}
