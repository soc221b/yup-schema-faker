import { isSchema } from 'yup'

export const isReference = (schema: any) => schema?.__isYupRef === true

export const isLazy = (schema: any) => isSchema(schema) && (schema as any)['type'] === 'lazy'
