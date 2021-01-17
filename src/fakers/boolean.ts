import { random } from 'faker'
import { MixedFaker } from './mixed'

import type { BooleanSchema } from 'yup'

export class BooleanFaker extends MixedFaker<BooleanSchema> {
  doFake() {
    return random.boolean()
  }
}
