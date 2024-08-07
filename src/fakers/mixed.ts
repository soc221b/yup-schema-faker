import { getFaker } from '../faker'
import { boolean, number, string, date, mixed } from 'yup'
import { SchemaFaker, addFaker } from './schema'

import type { AnySchema } from 'yup'
import type { Options } from '../type'

const schemaConstructors: (() => AnySchema)[] = [boolean, number, string, date]

export class MixedFaker<Schema extends AnySchema> extends SchemaFaker<Schema> {
  constructor(schema: Schema) {
    super(schema)
    this.schema = schema
  }

  doFake(options?: Options) {
    let randomSchema = schemaConstructors[getFaker().number.int({ min: 0, max: schemaConstructors.length - 1 })]()

    if (this.schema.spec.optional === false) {
      randomSchema = randomSchema.defined()
    }

    if (this.schema.spec.nullable) {
      /* istanbul ignore next */
      randomSchema = randomSchema.nullable()
    }

    if (this.schema.spec.default) {
      randomSchema.spec.default = this.schema.spec.default
    }

    return MixedFaker.rootFake(randomSchema, options)
  }
}

export const installMixedFaker = () => {
  addFaker(mixed, MixedFaker)
}
