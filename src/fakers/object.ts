import { mixed } from 'yup'
import { random, lorem } from 'faker'
import { MixedFaker } from './mixed'
import { isReference } from '../util'

import type { AnySchema, ObjectSchema } from 'yup'

export class ObjectFaker extends MixedFaker<ObjectSchema<any>> {
  doFake() {
    const fields = Object.keys(this.schema.fields)
    let result = {}
    result = fields
      .filter(key => isReference(this.schema.fields[key]) === false)
      .reduce((object, key) => {
        return Object.assign(object, { [key]: ObjectFaker.rootFake(this.schema.fields[key] as AnySchema, result) })
      }, result)
    result = Object.assign(
      result,
      fields
        .filter(key => isReference(this.schema.fields[key]))
        .reduce((object, key) => {
          return Object.assign(object, { [key]: ObjectFaker.rootFake(this.schema.fields[key] as AnySchema, result) })
        }, result),
    )

    const noUnknown = this.schema.spec.strict && this.schema.describe().tests.some(test => test.name === 'noUnknown')
    if (noUnknown === false) {
      Array(random.number({ min: 10, max: 10 }))
        .fill(null)
        .map(() => lorem.word())
        .filter(field => fields.includes(field) === false)
        .slice(0, 5)
        .reduce((object, key) => {
          return Object.assign(object, { [key]: ObjectFaker.rootFake(mixed()) })
        }, result)
    }

    return result
  }
}
