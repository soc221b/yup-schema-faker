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

export let faker: Faker
export let datatype: any
export let lorem: any
export let internet: any
export let random: any
export let fakerNumber: any

export const install = (fakerInstance: Faker) => {
  BaseFaker.rootFake = rootFake

  console.log('installing')
  faker = fakerInstance
  datatype = faker.datatype ?? faker.random
  lorem = faker.lorem
  fakerNumber = faker.number
  internet = faker.internet
  random = faker.random

  installMixedFaker()
  installArrayFaker()
  installBooleanFaker()
  installDateFaker()
  installNumberFaker()
  installObjectFaker()
  installStringFaker()
}
