import { install } from '../src'
import { faker } from '@faker-js/faker'

beforeAll(() => {
  install(faker)
})
