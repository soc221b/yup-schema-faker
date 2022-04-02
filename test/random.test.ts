import { seed, fake } from '../src'
import RandExp from 'randexp'
import * as yup from 'yup'

const originalRandInt = RandExp.prototype.randInt

const schemas = [
  yup.mixed(),

  yup.boolean(),

  yup.number(),

  yup.date(),

  yup.string(),
  yup.string().uuid(),
  yup.string().email(),
  yup.string().url(),
  yup.string().matches(/\d{10}/),

  yup.object().shape({
    key: yup.string(),
  }),

  yup.array().of(yup.string()),
]

describe('seed', () => {
  it('should not have side effects', () => {
    expect(RandExp.prototype.randInt).toBe(originalRandInt)
    seed(1)
    expect(RandExp.prototype.randInt).toBe(originalRandInt)
  })

  it('should produce same results', () => {
    for (const schema of schemas) {
      seed(123)
      const firstRandom = fake(schema)

      seed(123)
      const secondRandom = fake(schema)

      try {
        expect(firstRandom).toEqual(secondRandom)
      } catch (error) {
        console.log(`schema: ${JSON.stringify(schema.describe(), null, 2)}`)
        console.log(`first: ${JSON.stringify(firstRandom, null, 2)}`)
        console.log(`second: ${JSON.stringify(secondRandom, null, 2)}`)
        throw error
      }
    }
  })
})
