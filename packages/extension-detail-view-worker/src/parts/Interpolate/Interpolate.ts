export const interpolate = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  if (inMax === inMin) {
    return Math.round(outMin)
  }
  const clamped = Math.min(Math.max(value, inMin), inMax)
  const ratio = (clamped - inMin) / (inMax - inMin)
  const mapped = outMin + ratio * (outMax - outMin)
  return Math.round(mapped)
}
