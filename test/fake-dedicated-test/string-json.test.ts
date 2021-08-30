import { addMethod, string, mixed, array } from 'yup'
import { fake, fakeDedicatedTest } from '../../src'

import type { Schema } from 'yup'

declare module 'yup' {
  interface StringSchema {
    json<S extends Schema<unknown>>(this: S, schema: Schema<unknown>): S

    test(_: unknown): this
  }
}

addMethod(string, 'json', function (schema: Schema<unknown>) {
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
    const innerSchema = schema.tests.find(test => test.OPTIONS.name === 'json')?.OPTIONS.params
      ?.schema as Schema<unknown>
    return fake(innerSchema)
  })
})

it('should run dedicated test', () => {
  fakeDedicatedTest(string, 'json', schema => {
    const innerSchema = schema.tests.find(test => test.OPTIONS.name === 'json')?.OPTIONS.params
      ?.schema as Schema<unknown>
    return JSON.stringify(fake(innerSchema))
  })

  const innerSchema = array()
    .strict(true)
    .defined()
    .min(1)
    .of(mixed().strict(true).defined().oneOf([42, 'foo']))
  const schema = string().strict(true).defined().json(innerSchema)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
