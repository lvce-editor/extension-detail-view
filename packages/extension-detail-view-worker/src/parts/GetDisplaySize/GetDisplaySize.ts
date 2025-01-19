import prettyBytes from 'pretty-bytes'

export const getDisplaySize = (size: number): string => {
  return prettyBytes(size, {
    maximumFractionDigits: 1,
  })
}
