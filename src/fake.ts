import { datatype } from './faker'
import { Schema } from 'yup'
import { BaseFaker, globalOptions, typeToFaker } from './fakers/base'
import { MixedFaker } from './fakers/mixed'
import { Fake, Options } from './type'
import { isLazy, isReference, isStrict } from './util'

BaseFaker.rootFake = rootFake

export function rootFake<S extends Schema<unknown>>(schema: S, options: Options = {}): ReturnType<Fake<S>> {
  const originalStrict = globalOptions.strict
  globalOptions.strict = options.strict || isStrict(schema) || originalStrict

  let result

  if (isReference(schema)) {
    result = (schema as any).getValue(options)
  } else if (isLazy(schema)) {
    if (datatype.float({ min: 0, max: 1 }) > 0.1) result = undefined as any
    else result = rootFake(schema.resolve({}), options)
  } else if (schema._conditions?.length) {
    result = rootFake(schema.resolve(options))
  } else {
    const faker = new (typeToFaker.get(schema.type) as typeof MixedFaker)(schema)
    result = faker.fake(options)
  }

  globalOptions.strict = originalStrict

  return result
}

export function fake<S extends Schema<unknown>>(schema: S, options?: Pick<Options, 'context' | 'strict'>) {
  return rootFake(schema, options)
}
