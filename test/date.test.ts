import { date } from 'yup'
import { fake } from '../src'

it('should fake data for date schema', () => {
  expect(typeof fake(date())).toBe('string')
  expect(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(fake(date()))).toBe(true)
})
