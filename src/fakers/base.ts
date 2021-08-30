import { datatype } from '../faker'
import { isSchema } from 'yup'
import { hasDefault, getDefault, isNullable } from '../util'

import type { Schema } from 'yup'
import type { Fake, Options } from '../type'

export const globalOptions = { strict: false }

const SAFE_COUNT = 99999
export abstract class BaseFaker<S extends Schema<unknown>> {
  static rootFake: Fake<Schema<unknown>>

  static dedicatedTests: { [schema: string]: { [name: string]: (schema: Schema<unknown>) => any } } = {}

  protected schema: S

  constructor(schema: S) {
    this.schema = schema
  }

  fake(options?: Options) {
    const fns = [
      this.fakeDefault,
      this.fakeUndefined,
      this.fakeNullable,
      this.fakeOneOf,
      this.fakeNotOneOf,
      this.fakeDedicatedTest,
    ]
    for (const fn of fns) {
      const [hasFaked, result] = fn.call(this, options)
      if (hasFaked) return result
    }

    return this.doFake(options)
  }

  protected fakeDefault(): [boolean, any?] {
    if (datatype.float({ min: 0, max: 1 }) > 0.9 && hasDefault(this.schema)) {
      const _default = getDefault(this.schema)
      return [true, typeof _default === 'function' ? _default() : _default]
    }

    return [false]
  }

  protected fakeUndefined(): [boolean, any?] {
    if (
      hasDefault(this.schema) === false &&
      datatype.float({ min: 0, max: 1 }) > 0.9 &&
      this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!)) === false
    )
      return [true, undefined]

    return [false]
  }

  protected fakeNullable(): [boolean, any?] {
    if (
      datatype.float({ min: 0, max: 1 }) > 0.9 &&
      isNullable(this.schema) &&
      this.schema.tests.some(test => test.OPTIONS.name === 'required') === false
    )
      return [true, null]

    return [false]
  }

  protected fakeOneOf(): [boolean, any?] {
    if (this.schema._whitelistError !== undefined) {
      const oneOf = this.schema._whitelist.toArray()
      return [true, oneOf[datatype.number({ min: 0, max: oneOf.length - 1 })]]
    }

    return [false]
  }

  protected fakeNotOneOf(options?: Options): [boolean, any?] {
    const notOneOf = this.schema._blacklist
    if (this.schema._blacklistError !== undefined) {
      let safeCount = 0
      let data
      do {
        data = this.doFake(options)
      } while (notOneOf.has(data) && ++safeCount < SAFE_COUNT)
      return [true, data]
    }

    return [false]
  }

  protected fakeDedicatedTest(): [boolean, any?] {
    const dedicatedTest = this.schema.tests.find(
      test => BaseFaker.dedicatedTests[this.schema.type]?.[test.OPTIONS.name!] !== undefined,
    )
    if (dedicatedTest)
      return [true, BaseFaker.dedicatedTests[this.schema.type][dedicatedTest.OPTIONS.name!](this.schema)]

    return [false]
  }

  protected doFake(_options?: Options) {}
}

export function fakeDedicatedTest<S extends Schema<unknown>>(
  schemaConstructor: (...arg: any[]) => S,
  name: string,
  fakeFn: (schema: Schema<unknown>) => any,
) {
  if (schemaConstructor === undefined || isSchema(schemaConstructor) === false)
    throw new TypeError('You must provide a yup schema constructor function')
  if (typeof name !== 'string') throw new TypeError('A Method name must be provided')
  if (typeof fakeFn !== 'function') throw new TypeError('Method function must be provided')

  const schemaType = schemaConstructor().type
  BaseFaker.dedicatedTests[schemaType] = BaseFaker.dedicatedTests[schemaType] ?? {}
  BaseFaker.dedicatedTests[schemaType][name] = fakeFn
}

export const typeToFaker = new Map<String, any>()
export function addFaker<S extends Schema<unknown>, Faker>(
  schemaConstructor: (...arg: any[]) => S,
  fakerConstructor: Faker,
) {
  if (schemaConstructor === undefined || isSchema(schemaConstructor) === false)
    throw new TypeError('You must provide a yup schema constructor function')

  const schemaType = schemaConstructor().type
  typeToFaker.set(schemaType, fakerConstructor)
}
