import { warn } from '../util'

import type { AnySchema } from 'yup'
import type { Fake } from '../type'

export class MixedFaker<Schema extends AnySchema> {
  schema: Schema
  rootFake: Fake

  constructor(schema: Schema, fake: Fake) {
    this.schema = schema
    this.rootFake = fake
  }

  fake() {
    // fake optional
    if (Math.random() > 0.8 && this.schema.tests.some(test => test.OPTIONS.name === 'required') === false) {
      return this.fakeUndefined()
    }

    return this.doFake()
  }

  fakeUndefined() {
    if (this.schema.spec.default !== undefined) {
      return this.fakeDefault()
    }

    return undefined
  }

  fakeDefault() {
    return typeof this.schema.spec.default === 'function' ? this.schema.spec.default() : this.schema.spec.default
  }

  doFake() {
    warn('not implemented')
  }
}
