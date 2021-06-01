import { datatype } from 'faker'
import { boolean, number, string, date, mixed } from 'yup'
import { BaseFaker, addFaker } from './base'

import type { AnySchema } from 'yup'
import type { Options } from '../type'

const booleanSchema = boolean()
const numberSchema = number()
const stringSchema = string()
const dateSchema = date()
const schemas: AnySchema[] = [booleanSchema, numberSchema, stringSchema, dateSchema]

export class MixedFaker<Schema extends AnySchema> extends BaseFaker<Schema> {
  constructor(schema: Schema) {
    super(schema)
    this.schema = schema
  }

  doFake(options?: Options) {
    let randomSchema = schemas[datatype.number({ min: 0, max: schemas.length - 1 })]

    if (this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!))) {
      randomSchema = randomSchema.required()
    }

    if (this.schema.spec.nullable) {
      /* istanbul ignore next */
      randomSchema = randomSchema.nullable()
    }

    return MixedFaker.rootFake(randomSchema, options)
  }
}

addFaker(mixed, MixedFaker)
