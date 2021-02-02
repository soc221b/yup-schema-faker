import type { AnySchema } from 'yup'

export type Fake<Schema extends AnySchema> = (schema: AnySchema, options?: Options) => ReturnType<Schema['cast']>

export interface FakeSchema<Schema extends AnySchema = AnySchema> {
  (schema: Schema, fake: Fake<AnySchema>): any
}

export interface Options {
  context?: object
  parent?: any
  value?: any
}
