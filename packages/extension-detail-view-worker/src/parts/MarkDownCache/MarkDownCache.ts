export const has = async (key: string): Promise<boolean> => {
  const cache = await caches.open('lvce-editor/extension-detail-markdown-cache')
  const response = await cache.match(key)
  return Boolean(response)
}

export const get = async (key: string): Promise<string> => {
  const cache = await caches.open('lvce-editor/extension-detail-markdown-cache')
  const response = await cache.match(key)
  const text = await response?.text()
  return text || ''
}

export const set = async (key: string, value: string): Promise<void> => {
  const cache = await caches.open('lvce-editor/extension-detail-markdown-cache')
  await cache.put(
    key,
    new Response(value, {
      headers: {
        'Content-Type': 'application/markdown',
      },
    }),
  )
}
