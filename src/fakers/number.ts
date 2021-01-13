import { random } from 'faker'
import { NumberSchema } from 'yup'
import { FakeSchema } from '../type'
import { typeToFaker } from '..'

export const fakeNumber: FakeSchema<NumberSchema> = (schema, fake) => {
  let min: number = -Number.MAX_SAFE_INTEGER
  let max: number = Number.MAX_SAFE_INTEGER
  const setMin = (number: number | undefined = -Number.MAX_SAFE_INTEGER) => (min = Math.max(min, number))
  const setMax = (number: number | undefined = Number.MAX_SAFE_INTEGER) => (max = Math.min(max, number))
  let integer: boolean | undefined = undefined
  let round = undefined as 'floor' | 'ceil' | 'trunc' | 'round' | undefined

  for (const test of schema.tests) {
    switch (test.OPTIONS.name) {
      case 'min':
        if (typeof test.OPTIONS.params!.min === 'number') {
          setMin(test.OPTIONS.params!.min)
        }
        if (typeof test.OPTIONS.params!.more === 'number') {
          const more =
            test.OPTIONS.params!.more + Number.EPSILON === test.OPTIONS.params!.more
              ? test.OPTIONS.params!.more + 1
              : test.OPTIONS.params!.more + Number.EPSILON
          setMin(more)
        }
        break
      case 'max':
        if (typeof test.OPTIONS.params!.max === 'number') {
          setMax(test.OPTIONS.params!.max)
        }
        if (typeof test.OPTIONS.params!.less === 'number') {
          const less =
            test.OPTIONS.params!.less + Number.EPSILON === test.OPTIONS.params!.less
              ? test.OPTIONS.params!.less - 1
              : test.OPTIONS.params!.less - Number.EPSILON
          setMax(less)
        }
        break
      case 'positive':
        setMin(Number.EPSILON)
        break
      case 'negative':
        setMin(-Number.EPSILON)
        break
      case 'integer':
        setMin(Math.ceil(min))
        setMax(Math.floor(max))
        integer = true
        break
      case 'round':
        round = test.OPTIONS.params!.moreThan as typeof round
        break
      default:
        // TODO: expose for customize
        break
    }
  }

  let result = random.number({
    min,
    max,
  })
  if (integer) {
    result = Math.round(result)
  }
  if (round) {
    result = Math[round](result)
  }

  return result
}

typeToFaker.set('number', fakeNumber)
