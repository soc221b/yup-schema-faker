import Faker from 'faker'
import RandExp from 'randexp'

export const seed = (value: number) => {
  Faker.seed.call(Faker, value)
  RandExp.prototype.randInt = (from, to) => Faker.datatype.number({ min: from, max: to })
}
