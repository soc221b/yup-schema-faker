import { isSchema } from 'yup'

export const isReference = (schema: any) => schema?.__isYupRef === true

export const isLazy = (schema: any) =>
  isSchema(schema) && Object.keys(schema).length === 1 && Object.keys(schema)[0] === '_resolve'

export const isNullable = (schema: any) => schema._nullable

export const isStrict = (schema: any) => schema._options?.strict

export const hasDefault = (schema: any) => Object.prototype.hasOwnProperty.call(schema, '_default')

export const getDefault = (schema: any) => schema['_default']
