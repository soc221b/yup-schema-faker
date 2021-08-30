import { mixed } from 'yup'
import { addFaker, MixedFaker } from 'yup-schema-faker'

const MixedSchema = mixed

// Define a custom schema
class CustomMixedSchema extends MixedSchema {
  static create() {
    return new CustomMixedSchema()
  }

  // yup-schema-faker use type to distinguish diffrent schema
  // Here we just rename it to simulate that it is not built-in schema
  type = 'custom-mixed'
}
const customMixed = () => new CustomMixedSchema()

// Since the type of CustomMixedSchema is changed, you must have to register it to distinguish the schema.
// We register the custom schema and simply use the existing faker to fake the schema.
addFaker(customMixed, MixedFaker)

// Expose to window for demo
;(window as any).customMixed = customMixed
