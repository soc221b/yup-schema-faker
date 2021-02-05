import { mixed, object } from 'yup'
import { random, lorem } from 'faker'
import { MixedFaker } from './mixed'
import { isReference } from '../util'
import { addFaker } from './base'

import type { AnySchema, ObjectSchema } from 'yup'
import type { Options } from '../type'

export class ObjectFaker extends MixedFaker<ObjectSchema<any>> {
  doFake(options?: Options) {
    const fields = Object.keys(this.schema.fields)
    let result = {}
    result = {
      ...fields
        .filter(key => isReference(this.schema.fields[key]) === false)
        .reduce((object, key) => {
          return Object.assign(object, {
            [key]: ObjectFaker.rootFake(this.schema.fields[key] as AnySchema, { ...options, parent: result }),
          })
        }, result),
      ...fields
        .filter(key => isReference(this.schema.fields[key]))
        .reduce((object, key) => {
          return Object.assign(object, {
            [key]: ObjectFaker.rootFake(this.schema.fields[key] as AnySchema, { ...options, parent: result }),
          })
        }, result),
    }

    const noUnknown = this.schema.spec.strict && this.schema.tests.some(test => test.OPTIONS.name === 'noUnknown')
    if (noUnknown === false) {
      Array(random.number({ min: 10, max: 10 }))
        .fill(null)
        .map(() => lorem.word())
        .filter(field => fields.includes(field) === false)
        .slice(0, 5)
        .reduce((object, key) => {
          return Object.assign(object, { [key]: ObjectFaker.rootFake(mixed(), options) })
        }, result)
    }

    return result
  }
}

addFaker(object, ObjectFaker)
