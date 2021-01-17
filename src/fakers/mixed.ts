import { warn } from '../util'
import { random } from 'faker'

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
    if (
      Math.random() > 0.8 &&
      this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!)) === false
    ) {
      return this.fakeUndefined()
    }

    const oneOf = this.schema.describe().oneOf
    if (oneOf.length) {
      return oneOf[random.number({ min: 0, max: oneOf.length - 1 })]
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
