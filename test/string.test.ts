import { string } from 'yup'
import { fake } from '../src'

it('should fake data for string schema', () => {
  expect(typeof fake(string())).toBe('string')
})
