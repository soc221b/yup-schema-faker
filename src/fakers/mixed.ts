import { random } from 'faker'
import { boolean, number, string, date, isSchema } from 'yup'

import type { AnySchema } from 'yup'
import type { Options } from '../type'
import { BaseFaker } from './base'

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
    let schema = schemas[random.number({ min: 0, max: schemas.length - 1 })]

    if (this.schema.tests.some(test => ['required', 'defined'].includes(test.OPTIONS.name!))) {
      schema = schema.required()
    }

    if (this.schema.spec.nullable) {
      /* istanbul ignore next */
      schema = schema.nullable()
    }

    return MixedFaker.rootFake(schema, options)
  }
}
