import { object } from 'yup'
import { fake } from '../src'

it('should fake data for object schema', () => {
  expect(Object.prototype.toString.call(fake(object().shape({ a: object().shape({}) })))).toBe('[object Object]')
})
