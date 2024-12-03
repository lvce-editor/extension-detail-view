export const logError = async (error: any, _prefix = '') => {
  console.error(error)
}

export const handleError = async (error: any, _notify = true, _prefix = '') => {
  console.error(error)
}
