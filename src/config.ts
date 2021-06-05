import Faker, { datatype } from './faker'
import RandExp from 'randexp'

export const seed = (value: number) => {
  Faker.seed.call(Faker, value)
  RandExp.prototype.randInt = (from, to) => datatype.number({ min: from, max: to })
}
