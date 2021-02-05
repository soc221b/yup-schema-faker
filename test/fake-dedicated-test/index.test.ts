import { string } from 'yup'
import { fakeDedicatedTest } from '../../src'

it('should validate parameters', () => {
  // @ts-ignore
  expect(() => fakeDedicatedTest()).toThrow('You must provide a yup schema constructor function')
  // @ts-ignore
  expect(() => fakeDedicatedTest(string)).toThrow('A Method name must be provided')
  // @ts-ignore
  expect(() => fakeDedicatedTest(string, 'foo', 'not a function')).toThrow('Method function must be provided')
})
