import { AnySchema } from 'yup'

export interface Fake {
  (schema: AnySchema, parent?: any): any
}

export interface FakeSchema<Schema extends AnySchema = AnySchema> {
  (schema: Schema, fake: Fake): any
}
