import { addFaker } from '../../src'

it('should validate parameters', () => {
  // @ts-ignore
  expect(() => addFaker()).toThrow('You must provide a yup schema constructor function')
})
