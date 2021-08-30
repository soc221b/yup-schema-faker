import { datatype } from '../faker'
import { boolean, number, string, date, mixed } from 'yup'
import { BaseFaker, addFaker } from './base'
import { getDefault, hasDefault, isNullable } from '../util'

import type { Schema, BooleanSchema, NumberSchema, StringSchema, DateSchema } from 'yup'
import type { Options } from '../type'

const booleanSchema = boolean()
const numberSchema = number()
const stringSchema = string()
const dateSchema = date()
const schemas: Array<BooleanSchema<any> | NumberSchema<any> | StringSchema<any> | DateSchema<any>> = [
  booleanSchema,
  numberSchema,
  stringSchema,
  dateSchema,
]

export class MixedFaker<S extends Schema<unknown>> extends BaseFaker<S> {
  constructor(schema: S) {
    super(schema)
    this.schema = schema
  }

  doFake(options?: Options) {
    let randomSchema = schemas[datatype.number({ min: 0, max: schemas.length - 1 })]

    if (this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!))) {
      randomSchema = randomSchema.required()
    }

    if (isNullable(this.schema)) {
      /* istanbul ignore next */
      randomSchema = randomSchema.nullable()
    }

    if (hasDefault(this.schema)) {
      randomSchema = randomSchema.default(getDefault(this.schema))
    }

    return MixedFaker.rootFake(randomSchema, options)
  }
}

addFaker(mixed, MixedFaker)
