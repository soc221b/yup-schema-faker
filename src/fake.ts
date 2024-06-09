import { getDatatype } from './faker'
import { AnySchema } from 'yup'
import { globalOptions, typeToFaker } from './fakers/base'
import { MixedFaker } from './fakers/mixed'
import { Fake, Options } from './type'
import { isLazy, isReference } from './util'

export function rootFake<Schema extends AnySchema>(schema: Schema, options: Options = {}): ReturnType<Fake<Schema>> {
  const originalStrict = globalOptions.strict
  globalOptions.strict = options.strict || schema.spec?.strict || originalStrict

  let result

  if (isReference(schema)) {
    result = (schema as any).getValue(undefined, options?.parent, options.context)
  } else if (isLazy(schema)) {
    if (getDatatype().float({ min: 0, max: 1 }) > 0.1) result = undefined as any
    else result = rootFake(schema.resolve({}), options)
  } else if ((schema as any).conditions.length) {
    result = rootFake(schema.resolve(options))
  } else {
    const faker = new (typeToFaker.get(schema.type) as typeof MixedFaker)(schema)
    result = faker.fake(options)
  }

  globalOptions.strict = originalStrict

  return result
}

export function fake<Schema extends AnySchema>(schema: Schema, options?: Pick<Options, 'context' | 'strict'>) {
  return rootFake(schema, options)
}
