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
    return undefined
  }

  doFake() {
    warn('not implemented')
  }
}
