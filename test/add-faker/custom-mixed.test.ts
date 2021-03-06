import { MixedSchema } from 'yup'
import { addFaker, MixedFaker, fake } from '../../src'

// define custom schema
class CustomMixedSchema extends MixedSchema {
  static create() {
    return new CustomMixedSchema()
  }

  type = 'custom-mixed'
}
const customMixed = () => new CustomMixedSchema()

// define and register custom faker
const CustomMixedSchemaFaker = MixedFaker
addFaker(customMixed, CustomMixedSchemaFaker)

it('should be a valid schema constructor', () => {
  const schema = customMixed().oneOf([42])

  const actual = fake(schema)

  expect(schema.isValidSync(actual)).toBe(true)
})
