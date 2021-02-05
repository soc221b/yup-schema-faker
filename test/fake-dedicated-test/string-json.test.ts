import { addMethod, string, mixed, array } from 'yup'
import { fake, fakeDedicatedTest } from '../../src'

import type { AnySchema } from 'yup'

declare module 'yup' {
  interface StringSchema {
    json<Schema extends AnySchema>(this: Schema, schema: AnySchema): Schema
  }
}

addMethod(string, 'json', function (schema: AnySchema) {
  return this.test({
    name: 'json',
    params: {
      schema,
    },
    test(value: unknown) {
      try {
        const parsedValue = JSON.parse(value as string)
        return schema.isValidSync(parsedValue)
      } catch (error) {
        return false
      }
    },
  })
})

it('should be a valid schema', () => {
  expect(
    string()
      .json(array().of(mixed().oneOf([42, 'foo'])))
      .isValidSync(JSON.stringify([42, 'foo'])),
  ).toBe(true)

  expect(
    string()
      .json(array().of(mixed().oneOf([42, 'foo'])))
      .isValidSync(JSON.stringify([42, 'bar'])),
  ).toBe(false)
})

it('should be allowed to add dedicated test', () => {
  fakeDedicatedTest(string, 'json', schema => {
    const innerSchema = schema.tests.find(test => test.OPTIONS.name === 'json')?.OPTIONS.params?.schema as AnySchema
    return fake(innerSchema)
  })
})

it('should run dedicated test', () => {
  fakeDedicatedTest(string, 'json', schema => {
    const innerSchema = schema.tests.find(test => test.OPTIONS.name === 'json')?.OPTIONS.params?.schema as AnySchema
    return JSON.stringify(fake(innerSchema))
  })

  const innerSchema = array()
    .strict()
    .defined()
    .min(1)
    .of(mixed().strict().defined().oneOf([42, 'foo']))
  const schema = string().strict().defined().json(innerSchema)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
