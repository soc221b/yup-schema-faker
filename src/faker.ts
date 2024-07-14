import { Faker } from '@faker-js/faker'

let _faker: Faker

export const setFaker = (faker: Faker) => {
  _faker = faker
}

export const getFaker = () => {
  return _faker
}
