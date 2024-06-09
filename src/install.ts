import { rootFake } from './fake'
import { BaseFaker } from './fakers/base'
import { installArrayFaker } from './fakers/array'
import { installBooleanFaker } from './fakers/boolean'
import { installDateFaker } from './fakers/date'
import { installMixedFaker } from './fakers/mixed'
import { installNumberFaker } from './fakers/number'
import { installObjectFaker } from './fakers/object'
import { installStringFaker } from './fakers/string'
import type { Faker } from '@faker-js/faker'
import { setFaker } from './faker'

export const install = (faker: Faker) => {
  BaseFaker.rootFake = rootFake

  setFaker(faker)

  installMixedFaker()
  installArrayFaker()
  installBooleanFaker()
  installDateFaker()
  installNumberFaker()
  installObjectFaker()
  installStringFaker()
}
