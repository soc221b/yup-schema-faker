import { random, lorem } from 'faker'
import { AnySchema, ObjectSchema } from 'yup'
import { ObjectShape } from 'yup/lib/object'
import { FakeSchema } from '../type'

export const fakeObject: FakeSchema<ObjectSchema<ObjectShape>> = (schema, fake) => {
  let result = {}

  const fields = Object.keys(schema.fields)
  result = fields.reduce((object, key) => {
    return Object.assign(object, { [key]: fake(schema.fields[key] as AnySchema) })
  }, result)

  const noUnknown = schema.describe().tests.some(test => test.name === 'noUnknown')
  if (noUnknown === false) {
    Array(random.number({ min: 10, max: 10 }))
      .fill(null)
      .map(() => lorem.word())
      .filter(field => fields.includes(field) === false)
      .slice(0, 5)
      .reduce((object, key) => {
        return Object.assign(object, { [key]: lorem.paragraph() })
      }, result)
  }

  return result
}
