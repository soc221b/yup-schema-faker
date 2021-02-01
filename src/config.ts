import Faker from 'faker'

export const seed = (value: number) => {
  Faker.seed.call(Faker, value)
}
