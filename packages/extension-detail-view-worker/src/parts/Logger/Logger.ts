export const error = async (error: Error): Promise<void> => {
  // TODO send message to error worker or log worker
  // @ts-ignore
  console.error(error)
}
