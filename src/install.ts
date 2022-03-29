import { rootFake } from './fake'
import { BaseFaker } from './fakers/base'
import { installArrayFaker } from './fakers/array'
import { installBooleanFaker } from './fakers/boolean'
import { installDateFaker } from './fakers/date'
import { installMixedFaker } from './fakers/mixed'
import { installNumberFaker } from './fakers/number'
import { installObjectFaker } from './fakers/object'
import { installStringFaker } from './fakers/string'

export const install = () => {
  BaseFaker.rootFake = rootFake

  installMixedFaker()
  installArrayFaker()
  installBooleanFaker()
  installDateFaker()
  installNumberFaker()
  installObjectFaker()
  installStringFaker()
}
