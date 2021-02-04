import { random } from 'faker'
import { boolean, number, string, date, isSchema } from 'yup'

import type { AnySchema } from 'yup'
import type { Fake, Options } from '../type'

const booleanSchema = boolean()
const numberSchema = number()
const stringSchema = string()
const dateSchema = date()
const schemas: AnySchema[] = [booleanSchema, numberSchema, stringSchema, dateSchema]

const SAFE_COUNT = 99999
export class MixedFaker<Schema extends AnySchema> {
  static rootFake: Fake<AnySchema>

  static dedicatedTests: { [schema: string]: { [name: string]: (schema: AnySchema) => any } } = {}

  schema: Schema

  constructor(schema: Schema) {
    this.schema = schema
  }

  fake(options?: Options) {
    if (
      random.float({ min: 0, max: 1 }) > 0.8 &&
      this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!)) === false
    ) {
      return this.fakeUndefined()
    }

    if (
      random.float({ min: 0, max: 1 }) > 0.8 &&
      this.schema.spec.nullable &&
      this.schema.tests.some(test => test.OPTIONS.name === 'required') === false
    ) {
      return this.fakeNullable()
    }

    const oneOf = this.schema.describe().oneOf
    if (oneOf.length) {
      return oneOf[random.number({ min: 0, max: oneOf.length - 1 })]
    }

    const notOneOf = this.schema.describe().notOneOf
    if (notOneOf.length) {
      let safeCount = 0
      let data
      do {
        data = this.doFake(options)
      } while (notOneOf.includes(data) && ++safeCount < SAFE_COUNT)
      return data
    }

    const dedicatedTest = this.schema.tests.find(
      test => MixedFaker.dedicatedTests[this.schema.type]?.[test.OPTIONS.name!] !== undefined,
    )
    if (dedicatedTest) {
      return MixedFaker.dedicatedTests[this.schema.type][dedicatedTest.OPTIONS.name!](this.schema)
    }

    return this.doFake(options)
  }

  fakeUndefined() {
    if (this.schema.spec.default !== undefined) {
      return this.fakeDefault()
    }

    return undefined
  }

  fakeNullable() {
    return null
  }

  fakeDefault() {
    return typeof this.schema.spec.default === 'function' ? this.schema.spec.default() : this.schema.spec.default
  }

  doFake(options?: Options) {
    let schema = schemas[random.number({ min: 0, max: schemas.length - 1 })]

    if (this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!))) {
      schema = schema.required()
    }

    if (this.schema.spec.nullable) {
      /* istanbul ignore next */
      schema = schema.nullable()
    }

    return MixedFaker.rootFake(schema, options)
  }
}

export function fakeDedicatedTest<Schema extends AnySchema>(
  schemaConstructor: (...arg: any[]) => Schema,
  name: string,
  fakeFn: (schema: AnySchema) => any,
) {
  if (isSchema(schemaConstructor) === false) throw new TypeError('You must provide a yup schema constructor function')
  if (typeof name !== 'string') throw new TypeError('A Method name must be provided')
  if (typeof fakeFn !== 'function') throw new TypeError('Method function must be provided')
  const schemaType = schemaConstructor().type
  MixedFaker.dedicatedTests[schemaType] = MixedFaker.dedicatedTests[schemaType] ?? {}
  MixedFaker.dedicatedTests[schemaType][name] = fakeFn
}
