import { AnySchema, tuple } from 'yup'
import { addFaker, SchemaFaker } from './schema'

import type { TupleSchema } from 'yup'

export class TupleFaker extends SchemaFaker<TupleSchema> {
  doFake() {
    return this.schema.spec.types.map(type => TupleFaker.rootFake(type as AnySchema))
  }
}

export const installTupleFaker = () => {
  addFaker(tuple, TupleFaker)
}
