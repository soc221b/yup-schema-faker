import { rootFake } from './fake'
import { SchemaFaker } from './fakers/schema'
import { installArrayFaker } from './fakers/array'
import { installBooleanFaker } from './fakers/boolean'
import { installDateFaker } from './fakers/date'
import { installMixedFaker } from './fakers/mixed'
import { installNumberFaker } from './fakers/number'
import { installObjectFaker } from './fakers/object'
import { installStringFaker } from './fakers/string'
import { installTupleFaker } from './fakers/tuple'
import type { Faker } from '@faker-js/faker'
import { setFaker } from './faker'

export const install = (faker: Faker) => {
  SchemaFaker.rootFake = rootFake

  setFaker(faker)

  installMixedFaker()
  installArrayFaker()
  installBooleanFaker()
  installDateFaker()
  installNumberFaker()
  installObjectFaker()
  installStringFaker()
  installTupleFaker()
}
