import { Fake } from './type'

export const typeToFaker = new Map<String, any>()

export const fake: Fake = schema => {
  const faker = typeToFaker.get(schema.type)
  return faker(schema, fake)
}

export * from './type'
