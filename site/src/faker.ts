import { ref } from 'vue'
import { query } from './utils'
import { fake as yupSchemaFake, seed } from 'yup-schema-faker'

export const seedValue: number = JSON.parse(query.get('seedValue') ?? JSON.stringify(Math.floor(Math.random() * 1e9)))
query.set('seedValue', JSON.stringify(seedValue))
export const isInit = ref(true)
export const fake = (schema: Parameters<typeof yupSchemaFake>['0'], option?: Parameters<typeof yupSchemaFake>['1']) => {
  if (isInit.value) {
    seed(seedValue)
  }
  return yupSchemaFake(schema, option)
}
