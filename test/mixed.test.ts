import { mixed } from 'yup'
import { fake } from '../src'

it('should works with oneOf', () => {
  const data = {}
  const schema = mixed().required().oneOf([data])
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
