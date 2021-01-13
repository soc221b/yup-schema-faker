import { array } from 'yup'
import { fake } from '../src'

it('should fake data for array schema', () => {
  expect(Array.isArray(fake(array()))).toBe(true)
})

it('should have length between min and max', () => {
  const schema = array().min(10).max(10)
  expect(fake(schema).length).toBe(10)
  expect(fake(schema).length).toBe(10)
  expect(fake(schema).length).toBe(10)
})

it('should have specific length', () => {
  const schema = array().length(20)
  expect(fake(schema).length).toBe(20)
  expect(fake(schema).length).toBe(20)
  expect(fake(schema).length).toBe(20)
})
