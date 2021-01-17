import { AnySchema } from 'yup'

export interface Fake {
  (schema: AnySchema, context?: any): any
}

export interface FakeSchema<Schema extends AnySchema = AnySchema> {
  (schema: Schema, fake: Fake): any
}
