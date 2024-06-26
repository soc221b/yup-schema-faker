import { getDatatype, getFaker } from './faker'
import RandExp from 'randexp'

export const randexp = (pattern: string | RegExp, flags?: string) => {
  const randexp = new RandExp(pattern, flags)
  randexp.randInt = (from, to) => getDatatype().number({ min: from, max: to })
  return randexp.gen()
}

export const seed = (value: number) => {
  getFaker().seed.call(getFaker(), [value])
}
