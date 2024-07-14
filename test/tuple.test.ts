import { mixed, tuple } from 'yup'
import { fake } from '../src'

it('should works with tuple', () => {
  const schema = tuple([mixed().oneOf([1]), mixed().oneOf(['foo'])]).defined()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
