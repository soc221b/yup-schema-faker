import { fakeArray } from './fakers/array'
import { fakeBoolean } from './fakers/boolean'
import { fakeDate } from './fakers/date'
import { fakeNumber } from './fakers/number'
import { fakeObject } from './fakers/object'
import { fakeString } from './fakers/string'
import { Fake } from './type'

export const typeToFaker = new Map<String, any>()
typeToFaker.set('array', fakeArray)
typeToFaker.set('boolean', fakeBoolean)
typeToFaker.set('date', fakeDate)
typeToFaker.set('number', fakeNumber)
typeToFaker.set('object', fakeObject)
typeToFaker.set('string', fakeString)

export const fake: Fake = schema => {
  const faker = typeToFaker.get(schema.type)

  // fake optional
  if (Math.random() > 0.8 && schema.describe().tests.some(test => test.name === 'required') === false) {
    return undefined
  }

  return faker(schema, fake)
}

export * from './type'
export * from './fakers/array'
export * from './fakers/boolean'
export * from './fakers/date'
export * from './fakers/number'
export * from './fakers/object'
export * from './fakers/string'
