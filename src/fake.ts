import { datatype } from 'faker'
import { AnySchema } from 'yup'
import { BaseFaker, typeToFaker } from './fakers/base'
import { MixedFaker } from './fakers/mixed'
import { Fake, Options } from './type'
import { isLazy, isReference } from './util'

BaseFaker.rootFake = rootFake

export function rootFake<Schema extends AnySchema>(schema: Schema, options: Options = {}): ReturnType<Fake<Schema>> {
  if (isReference(schema)) {
    return (schema as any).getValue(undefined, options?.parent, options.context)
  }
  if (isLazy(schema)) {
    if (datatype.float({ min: 0, max: 1 }) > 0.1) return undefined as any
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
