export const existsJson = async (schemaUrl: string): Promise<boolean> => {
  try {
    // TODO verify that response header is json
    const response = await fetch(schemaUrl, {
      method: 'HEAD',
    })
    return response.ok
  } catch {
    return false
  }
}
