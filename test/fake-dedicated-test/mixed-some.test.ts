import { addMethod, mixed } from 'yup'
import { fake, fakeDedicatedTest } from '../../src'

import type { AnySchema } from 'yup'

declare module 'yup' {
  interface BaseSchema {
    some<Schema extends AnySchema>(this: Schema, ...schemas: AnySchema[]): Schema
  }
}

addMethod(mixed, 'some', function (...schemas) {
  // eslint-disable-next-line no-template-curly-in-string
  const message = '${path} is not a correct type'

  return this.test({
    message,
    name: 'some',
    exclusive: true,
    params: {
      schemas,
    },
    test(value) {
      return schemas.some(schema => schema.isValidSync(value))
    },
  })
})

it('should be a valid schema', () => {
  expect(
    mixed()
      .some(mixed().oneOf([42]), mixed().oneOf(['foo']))
      .isValidSync('foo'),
  ).toBe(true)

  expect(
    mixed()
      .some(mixed().oneOf([42]), mixed().oneOf(['foo']))
      .isValidSync('bar'),
  ).toBe(false)
})

it('should be allowed to add dedicated test', () => {
  fakeDedicatedTest(mixed, 'some', schema => {
    const innerSchema = schema.tests.find(test => test.OPTIONS.name === 'some')?.OPTIONS.params?.schema as AnySchema
    return fake(innerSchema)
  })
})

it('should run dedicated test', () => {
  fakeDedicatedTest(mixed, 'some', schema => {
    const innerSchemas = schema.tests.find(test => test.OPTIONS.name === 'some')?.OPTIONS.params?.schemas as AnySchema[]
    const pickedSchema = innerSchemas[Math.floor(Math.random() * innerSchemas.length)]
    return fake(pickedSchema)
  })

  const innerSchema1 = mixed().oneOf([42])
  const innerSchema2 = mixed().oneOf(['foo'])
  const schema = mixed().some(innerSchema1, innerSchema2)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
