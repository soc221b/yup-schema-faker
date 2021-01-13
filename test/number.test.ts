import { number } from 'yup'
import { fake } from '../src'

it('should fake data for number schema', () => {
  expect(typeof fake(number())).toBe('number')
})

it('should fake data between min and max', () => {
  const schema = number().min(10).max(10)
  expect(fake(schema)).toBe(10)
  expect(fake(schema)).toBe(10)
  expect(fake(schema)).toBe(10)
})

it('should fake data between moreThan and lessThan', () => {
  const schema = number().moreThan(19).lessThan(21).integer()
  expect(fake(schema)).toBe(20)
  expect(fake(schema)).toBe(20)
  expect(fake(schema)).toBe(20)
})
