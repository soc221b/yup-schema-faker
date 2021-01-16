import { boolean } from 'yup'
import { fake } from '../src'

it('should works with boolean', () => {
  const schema = boolean().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
