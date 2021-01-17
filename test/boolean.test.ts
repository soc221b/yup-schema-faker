import { boolean } from 'yup'
import { fake } from '../src'

const SAFE_COUNT = 99999
it('should works with default', () => {
  const defaultData = Math.random() > 0.5
  const defaultCb = jest.fn(() => defaultData)
  const schema = boolean().default(defaultCb)
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (defaultCb.mock.calls.length === 0 && ++count < SAFE_COUNT)
  expect(actual).toBe(defaultData)
})

it('should works with boolean', () => {
  const schema = boolean().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
