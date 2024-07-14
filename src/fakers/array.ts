import { mixed, array } from 'yup'
import { getFaker } from '../faker'
import { addFaker, SchemaFaker } from './schema'

import type { ArraySchema, Flags } from 'yup'
import type { Options } from '../type'

export class ArrayFaker<
  TIn extends any[] | null | undefined,
  TContext,
  TDefault = undefined,
  TFlags extends Flags = '',
> extends SchemaFaker<ArraySchema<TIn, TContext, TDefault, TFlags>> {
  doFake(options?: Options) {
    const min =
      ((this.schema.tests.find(test => test.OPTIONS?.name === 'length')?.OPTIONS?.params?.length as number) ||
        undefined) ??
      ((this.schema.tests.find(test => test.OPTIONS?.name === 'min')?.OPTIONS?.params?.min as number) || undefined) ??
      0
    const max =
      ((this.schema.tests.find(test => test.OPTIONS?.name === 'length')?.OPTIONS?.params?.length as number) ||
        undefined) ??
      ((this.schema.tests.find(test => test.OPTIONS?.name === 'max')?.OPTIONS?.params?.max as number) || undefined) ??
      min + 10

    let array = Array(getFaker().number.int({ min, max })).fill(null)
    const innerSchema = this.schema.innerType
    if (innerSchema) {
      array = array.map(() => ArrayFaker.rootFake(this.schema.innerType! as any, options))
    } else {
      array = array.map(() => ArrayFaker.rootFake(mixed(), options))
    }

    return array
  }
}

export const installArrayFaker = () => {
  addFaker(array, ArrayFaker)
}
