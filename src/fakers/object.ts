import { mixed, object } from 'yup'
import { getDatatype, getFaker } from '../faker'
import { MixedFaker } from './mixed'
import { isReference } from '../util'
import { addFaker, globalOptions } from './base'

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

    const noUnknown =
      this.schema.spec.strict ||
      globalOptions.strict ||
      this.schema.tests.some(test => test.OPTIONS.name === 'noUnknown')
    if (noUnknown === false) {
      const unknownFields = Array(getFaker().number.int({ min: 0, max: 5 }))
        .fill(null)
        .map(() => getFaker().lorem.word())
        .filter(field => fields.includes(field) === false)

      unknownFields.forEach(field => {
        Object.assign(result, { [field]: ObjectFaker.rootFake(mixed(), options) })
      })

      if (unknownFields.every(field => (result as any)[field] === undefined)) {
        unknownFields.forEach(field => delete (result as any)[field])
      }
    }

    if ((this.schema.spec.strict || globalOptions.strict) !== true && getDatatype().float({ min: 0, max: 1 }) > 0.9) {
      result = JSON.stringify(result)
    }

    return result
  }
}

export const installObjectFaker = () => {
  addFaker(object, ObjectFaker)
}
