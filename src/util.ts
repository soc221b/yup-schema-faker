const PREFIX_MESSAGE = '[yup-schema-faker]'
export function warn(message: string) {
  if (process.env.NODE_ENV !== 'development') {
    console.warn(`${PREFIX_MESSAGE} ${message}`)
  }
}
