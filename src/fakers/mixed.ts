import { random } from 'faker'
import { boolean, number, string, date } from 'yup'

import type { AnySchema } from 'yup'
import type { Fake } from '../type'

const booleanSchema = boolean()
const numberSchema = number()
const stringSchema = string()
const dateSchema = date()
const schemas: AnySchema[] = [booleanSchema, numberSchema, stringSchema, dateSchema]

const SAFE_COUNT = 99999
export class MixedFaker<Schema extends AnySchema> {
  static rootFake: Fake<AnySchema>

  schema: Schema

  constructor(schema: Schema) {
    this.schema = schema
  }

  fake() {
    if (
      Math.random() > 0.8 &&
      this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!)) === false
    ) {
      return this.fakeUndefined()
    }

    if (
      Math.random() > 0.8 &&
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
        data = this.doFake()
      } while (notOneOf.includes(data) && ++safeCount < SAFE_COUNT)
      return data
    }

    return this.doFake()
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

  doFake() {
    let schema = schemas[Math.floor(Math.random() * schemas.length)]

    if (this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!))) {
      schema = schema.required()
    }

    if (this.schema.spec.nullable) {
      /* istanbul ignore next */
      schema = schema.nullable()
    }

    return MixedFaker.rootFake(schema)
  }
}
