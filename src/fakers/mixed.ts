import { warn } from '../util'
import { random } from 'faker'

import type { AnySchema } from 'yup'
import type { Fake } from '../type'

const SAFE_COUNT = 99999
export class MixedFaker<Schema extends AnySchema> {
  schema: Schema
  rootFake: Fake<AnySchema>

  constructor(schema: Schema, fake: Fake<AnySchema>) {
    this.schema = schema
    this.rootFake = fake
  }

  fake() {
    if (
      Math.random() > 0.8 &&
      this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!)) === false
    ) {
      return this.fakeUndefined()
    }

    if (Math.random() > 0.8 && this.schema.spec.nullable) {
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
    warn('not implemented')
  }
}
