import { string } from 'yup'
import { getDatatype, getFaker } from '../faker'
import { randexp } from '../random'
import { MixedFaker } from './mixed'
import { fakeDedicatedTest, addFaker, globalOptions } from './base'

import type { StringSchema } from 'yup'

export class StringFaker extends MixedFaker<StringSchema> {
  doFake() {
    const min =
      (this.schema.tests.find(test => test.OPTIONS.name === 'length')?.OPTIONS.params?.length as number) ??
      (this.schema.tests.find(test => test.OPTIONS.name === 'min')?.OPTIONS.params?.min as number) ??
      undefined
    const max =
      (this.schema.tests.find(test => test.OPTIONS.name === 'length')?.OPTIONS.params?.length as number) ??
      (this.schema.tests.find(test => test.OPTIONS.name === 'max')?.OPTIONS.params?.max as number) ??
      undefined

    if (
      min === undefined &&
      this.schema.tests.some(test => test.OPTIONS.name === 'required') === false &&
      getDatatype().float({ min: 0, max: 1 }) > 0.9
    ) {
      return ''
    }

    // sentence and other function sometimes return undefined!
    let result = getFaker().lorem.paragraph(max ?? min)
    if (getDatatype().float({ min: 0, max: 1 }) > 0.9) {
      result = getFaker().lorem.paragraph(max ?? min) ?? result
    } else if (getDatatype().float({ min: 0, max: 1 }) > 0.9) {
      result = getFaker().lorem.word(max ?? min) ?? result
    } else {
      result = getFaker().lorem.sentence(max ?? min) ?? result
    }
    result = result.slice(0, max).trim()

    const shouldTrim =
      (this.schema.spec.strict || globalOptions.strict) && this.schema.tests.find(test => test.OPTIONS.name === 'trim')
    if (shouldTrim) {
      result = result.trim() + getFaker().random.alpha({ count: result.length })
    } else {
      result =
        ' '.repeat(getDatatype().number(max ?? min ?? 3)) + result + ' '.repeat(getDatatype().number(max ?? min ?? 3))
    }

    if (result.length < min) {
      result = result + getFaker().random.alpha({ count: min - result.length })
    }
    result = result.slice(0, max)

    const lowercase =
      (this.schema.spec.strict || globalOptions.strict) &&
      this.schema.tests.some(test => test.OPTIONS.name === 'string_case') &&
      this.schema.isValidSync(result.toLowerCase())
    const uppercase =
      (this.schema.spec.strict || globalOptions.strict) &&
      this.schema.tests.some(test => test.OPTIONS.name === 'string_case') &&
      this.schema.isValidSync(result.toUpperCase())
    result = lowercase ? result.toLowerCase() : uppercase ? result.toUpperCase() : result

    return result
  }
}

export const installStringFaker = () => {
  addFaker(string, StringFaker)

  fakeDedicatedTest(string, 'uuid', () => {
    return getDatatype().uuid()
  })

  fakeDedicatedTest(string, 'email', () => {
    return getFaker().internet.email()
  })

  fakeDedicatedTest(string, 'url', () => {
    return getFaker().internet.url()
  })

  fakeDedicatedTest(string, 'matches', schema => {
    const regexTest = schema.tests.find(test => test.OPTIONS.name === 'matches')
    return randexp(regexTest?.OPTIONS.params!.regex as RegExp)
  })
}
