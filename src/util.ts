const PREFIX_MESSAGE = '[yup-schema-faker]'
export function warn(message: string) {
  if (__DEV__) {
    console.warn(`${PREFIX_MESSAGE} ${message}`)
  }
}
