import type { Schema } from 'yup'

export type Fake<S extends Schema<unknown>> = (schema: Schema<unknown>, options?: Options) => ReturnType<S['cast']>

export interface FakeSchema<S extends Schema<unknown> = Schema<unknown>> {
  (schema: S, fake: Fake<Schema<unknown>>): any
}

export interface Options {
  context?: object
  parent?: any
  value?: any
  strict?: boolean
}
