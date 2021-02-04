import { random } from 'faker'
import { AnySchema } from 'yup'
import { BaseFaker } from './fakers/base'
import { ArrayFaker } from './fakers/array'
import { BooleanFaker } from './fakers/boolean'
import { DateFaker } from './fakers/date'
import { MixedFaker } from './fakers/mixed'
import { NumberFaker } from './fakers/number'
import { ObjectFaker } from './fakers/object'
import { StringFaker } from './fakers/string'
import { Fake, Options } from './type'
import { isLazy, isReference } from './util'

BaseFaker.rootFake = rootFake

export const typeToFaker = new Map<String, any>()
typeToFaker.set('array', ArrayFaker)
typeToFaker.set('boolean', BooleanFaker)
typeToFaker.set('date', DateFaker)
typeToFaker.set('number', NumberFaker)
typeToFaker.set('object', ObjectFaker)
typeToFaker.set('string', StringFaker)
typeToFaker.set('mixed', MixedFaker)

export function rootFake<Schema extends AnySchema>(schema: Schema, options: Options = {}): ReturnType<Fake<Schema>> {
  if (isReference(schema)) {
    return (schema as any).getValue(undefined, options?.parent, options.context)
  }
  if (isLazy(schema)) {
    if (random.float({ min: 0, max: 1 }) > 0.1) return undefined as any
    return rootFake(schema.resolve({}), options)
  }
  if ((schema as any).conditions.length) {
    return rootFake(schema.resolve(options))
  }

  const faker = new (typeToFaker.get(schema.type) as typeof MixedFaker)(schema)
  return faker.fake(options)
}

export function fake<Schema extends AnySchema>(schema: Schema, options?: Pick<Options, 'context'>) {
  return rootFake(schema, options)
}
