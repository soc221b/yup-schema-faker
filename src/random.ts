import { AnySchema } from 'yup'
import { getDatatype, getFaker } from './faker'
import RandExp from 'randexp'
import { Faker } from '@faker-js/faker'

export const randexp = (pattern: string | RegExp, flags?: string) => {
  const randexp = new RandExp(pattern, flags)
  randexp.randInt = (from, to) => getDatatype().number({ min: from, max: to })
  return randexp.gen()
}

export const seed = (value: number) => {
  getFaker().seed.call(getFaker(), [value])
}

export let _fake: (faker: Faker, schema: AnySchema, path?: PropertyKey[]) => undefined | any
export const overrideFaker = (
  fake: (faker: Faker, schema: AnySchema, path?: PropertyKey[]) => undefined | any,
): void => {
  _fake = fake
}
