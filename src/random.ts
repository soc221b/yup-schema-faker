import { getFaker } from './faker'
import RandExp from 'randexp'

export const randexp = (regexp: RegExp) => {
  const randexp = new RandExp(regexp)
  randexp.randInt = (from, to) => getFaker().number.int({ min: from, max: to })
  return randexp.gen()
}

export const seed = (value: number) => {
  getFaker().seed.call(getFaker(), [value])
}
