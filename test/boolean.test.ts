import { boolean } from 'yup'
import { fake } from '../src'

it('should fake data for boolean schema', () => {
  expect(typeof fake(boolean())).toBe('boolean')
})
