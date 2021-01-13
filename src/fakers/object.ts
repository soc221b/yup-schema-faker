import { AnySchema, ObjectSchema } from 'yup'
import { ObjectShape } from 'yup/lib/object'
import { FakeSchema } from '../type'
import { typeToFaker } from '..'

export const fakeObject: FakeSchema<ObjectSchema<ObjectShape>> = (schema, fake) => {
  const fields = schema.fields
  return Object.keys(fields).reduce((object, key) => {
    return Object.assign(object, { [key]: fake(schema.fields[key] as AnySchema) })
  }, {})
}

typeToFaker.set('object', fakeObject)
