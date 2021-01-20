import type { AnySchema } from 'yup'

export type Fake<Schema extends AnySchema> = (schema: AnySchema, parent?: any) => ReturnType<Schema['cast']>

export interface FakeSchema<Schema extends AnySchema = AnySchema> {
  (schema: Schema, fake: Fake<AnySchema>): any
}
