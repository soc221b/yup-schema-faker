import type { AnySchema, DateSchema } from 'yup'

export type Fake<Schema extends AnySchema> = (
  schema: AnySchema,
  parent?: any,
) => Schema extends DateSchema ? Date['toISOString'] : ReturnType<Schema['cast']>

export interface FakeSchema<Schema extends AnySchema = AnySchema> {
  (schema: Schema, fake: Fake<AnySchema>): any
}
