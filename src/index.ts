import Reference from 'yup/lib/Reference'
import { ArrayFaker } from './fakers/array'
import { BooleanFaker } from './fakers/boolean'
import { DateFaker } from './fakers/date'
import { MixedFaker } from './fakers/mixed'
import { NumberFaker } from './fakers/number'
import { ObjectFaker } from './fakers/object'
import { StringFaker } from './fakers/string'
import { Fake } from './type'

export const typeToFaker = new Map<String, any>()
typeToFaker.set('array', ArrayFaker)
typeToFaker.set('boolean', BooleanFaker)
typeToFaker.set('date', DateFaker)
typeToFaker.set('number', NumberFaker)
typeToFaker.set('object', ObjectFaker)
typeToFaker.set('string', StringFaker)
typeToFaker.set('mixed', MixedFaker)

const rootFake: Fake = (schema, context) => {
  if (schema instanceof Reference) {
    return schema.getValue(undefined, context)
  }

  const faker = new (typeToFaker.get(schema.type) as typeof MixedFaker)(schema, rootFake)
  return faker.fake()
}
export const fake = rootFake

export * from './type'
export * from './fakers/array'
export * from './fakers/boolean'
export * from './fakers/date'
export * from './fakers/number'
export * from './fakers/object'
export * from './fakers/string'
