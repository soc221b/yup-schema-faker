# Yup-schema-faker

> Yup-schema-faker will generate you a fake data based on your [yup](https://github.com/jquense/yup) schema.

[Showcase & Playground](https://soc221b.github.io/yup-schema-faker)

Key features:

- Extensible: you can fake for your own schemas, methods or override existing ones.

## Version Compatibiility

| yup                                                                  | @types/yup                                          | @faker-js/faker                                         | yup-schema-faker                                                    |
| -------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------- |
| [~0.28.x](https://github.com/jquense/yup/tree/v0.28.5)               | [~0.28.x](https://www.npmjs.com/package/@types/yup) | [^5.1.0](https://www.npmjs.com/package/@faker-js/faker) | [~2.28.x](https://github.com/soc221b/yup-schema-faker/tree/v2.28.x) |
| [~0.29.x](https://github.com/jquense/yup/tree/v0.29.3)               | [~0.29.x](https://www.npmjs.com/package/@types/yup) | [^5.1.0](https://www.npmjs.com/package/@faker-js/faker) | [~2.29.x](https://github.com/soc221b/yup-schema-faker/tree/v2.29.x) |
| [>= 0.32.0, <= 0.32.10](https://github.com/jquense/yup/tree/v0.32.9) | N/A                                                 | [^5.1.0](https://www.npmjs.com/package/@faker-js/faker) | [~2.32.x](https://github.com/soc221b/yup-schema-faker/tree/v2.32.x) |
| [>= 0.32.11, < 1.0.0](https://github.com/jquense/yup/tree/v0.32.11)  | N/A                                                 | [^7.4.0](https://www.npmjs.com/package/@faker-js/faker) | [^5.x.x](https://github.com/soc221b/yup-schema-faker/tree/v5.x.x)   |
| [>= 0.32.11, < 1.0.0](https://github.com/jquense/yup/tree/v0.32.11)  | N/A                                                 | [^8.4.1](https://www.npmjs.com/package/@faker-js/faker) | [^6.x.x](https://github.com/soc221b/yup-schema-faker/tree/v6.x.x)   |
| [^1.4.0](https://github.com/jquense/yup/tree/master)                 | N/A                                                 | [^8.4.1](https://www.npmjs.com/package/@faker-js/faker) | [^7.x.x](https://github.com/soc221b/yup-schema-faker/tree/v7.x.x)   |

## Getting Started

Install `yup-schema-faker` and its peer dependencies with your favorite package manager:

```sh
pnpm add yup@^1.4.0
pnpm add -D yup-schema-faker@^7.0.0
pnpm add -D @faker-js/faker@^8.4.1
pnpm add -D randexp@^0.5.3
```

Usage:

```typescript
import { object, string, number, date } from 'yup'
import { install, fake } from 'yup-schema-faker'
import { faker } from '@faker-js/faker'
// import { faker } from '@faker-js/faker/locale/ja'

// Before using it, you need to install all built-in fakers:
install(faker)

// If you have extended fakers, you need to install them here, too:
//
// addFaker(boolean, BooleanFaker)
//
// fakeDedicatedTest(boolean, 'is-value', schema => {
//   const isValueTest = schema.tests.find(test => test.OPTIONS.name === 'is-value')!
//   return isValueTest.OPTIONS.params?.value === 'true'
// })

// Define schema:
const userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
}).noUnknown()

// Fake data:
const fakeUser = fake(userSchema)
// {
//   "name": " Assumenda eos volup",
//   "age": 73684592,
//   "email": "Frederic.Keebler8@hotmail.com",
//   "website": "https://well-worn-co-producer.org",
//   "createdOn": "Fri Jun 09 2006 19:49:16 GMT+0800 (台北標準時間)",
// }
```

## API

### `fake`

Pass a yup schema and return a fake data.

Function signature:

```typescript
interface Options {
  // please see https://github.com/jquense/yup#schemastrictenabled-boolean--false-schema
  strict?: boolean

  // External values that used to resolve conditions and references.
  // please see https://github.com/jquense/yup#schemacastvalue-any-options---infertypeschema
  context?: object
}

function fake<Schema etends AnySchema>(schema: Schema, options?: Options): ReturnType<Schema['cast']>;
```

Example:

```typescript
const schema1 = yup.number().required()
fake(schema1)
// 763 or "971235"
fake(schema1, { strict: true })
// 9102

const schema2 = object({
  baz: ref('foo.bar'),
  foo: object({
    bar: string(),
  }),
  x: ref('$x'),
})
const context = { x: 5 }
fake(schema2, { context })
// {
//   foo: {
//     bar: 'Sit atque temporibus',
//   },
//   baz: 'Sit atque temporibus',
//   x: 5,
// }
```

### `fakeDedicatedTest`

Similar to [`addMethod`](https://github.com/jquense/yup#addmethodschematype-schema-name-string-method--schema-void), you
can use `fakeDedicatedTest` to fake extended methods.

Function signature:

```typescript
function fakeDedicatedTest<SchemaConstructor extends (...args: any[]) => AnySchema>(
  schemaConstructor: SchemaConstructor,
  name: string,
  fakeFn: (schema: ReturnType<SchemaConstructor>) => ReturnType<ReturnType<SchemaConstructor>['cast']>,
)
```

Example: [`string.json` example](./site/src/views/Custom/string-json.ts)

### `addFaker`

You can [create new schemas](https://github.com/jquense/yup/blob/master/docs/extending.md#creating-new-schema-types) in
yup. Similarly, you can use addFaker to create corresponding fakers for these schemas.

Function signature:

```typescript
function addFaker<Schema extends AnySchema, Faker>(
  schemaConstructor: (...arg: any[]) => Schema,
  fakerConstructor: Faker,
)
```

Example: [customMixed example](./site/src/views/Custom/custom-mixed.ts)

### `seed`

If you want to produce consistent results, you can set your own seed with integer:

```javascript
import { seed, fake } from 'yup-schema-faker'
import { string } from 'yup'

seed(123)
const first = fake(string())

seed(123)
const second = fake(string())

console.log(first === second) // true
```

## Supported yup API

- yup
  - ✅ addMethod(schemaType: Schema, name: string, method: ()=> Schema): void
  - ✅ yup.ref(path: string, options: { contextPrefix: string }): Ref
  - ✅ yup.lazy((value: any) => Schema): Lazy
- Schema
  - ✅ Schema.strict(enabled: boolean = false): Schema
  - ✅ Schema.default(value: any): Schema
  - ✅ Schema.nullable(message?: string | function): Schema
  - ✅ Schema.nonNullable(message?: string | function): Schema
  - ✅ Schema.defined(): Schema
  - ✅ Schema.optional(): Schema
  - ✅ Schema.required(message?: string | function): Schema
  - ✅ Schema.notRequired(): Schema
  - ✅ Schema.oneOf(arrayOfValues: Array<any>, message?: string | function): Schema Alias: equals
  - ✅ Schema.notOneOf(arrayOfValues: Array<any>, message?: string | function)
  - ✅ Schema.when(keys: string | string[], builder: object | (values: any[], schema) => Schema): Schema
- ✅ mixed
- string
  - ✅ string.required(message?: string | function): Schema
  - ✅ string.length(limit: number | Ref, message?: string | function): Schema
  - ✅ string.min(limit: number | Ref, message?: string | function): Schema
  - ✅ string.max(limit: number | Ref, message?: string | function): Schema
  - ✅ string.matches(regex: Regex, message?: string | function): Schema
  - ❌ string.matches(regex: Regex, options: { message: string, excludeEmptyString: bool }): Schema
    > this feature cannot be detected, use another schema to achieve this behavior
  - ✅ string.email(message?: string | function): Schema
  - ✅ string.url(message?: string | function): Schema
  - ✅ string.uuid(message?: string | function): Schema
  - ✅ string.datetime(options?: {message?: string | function, allowOffset?: boolean, precision?: number})
  - ✅ string.trim(message?: string | function): Schema
    > generate trimmed string iff in strict mode
  - ✅ string.lowercase(message?: string | function): Schema
    > generate lowercase string iff in strict mode
  - ✅ string.uppercase(message?: string | function): Schema
    > generate uppercase string iff in strict mode
- number
  - ✅ number.min(limit: number | Ref, message?: string | function): Schema
  - ✅ number.max(limit: number | Ref, message?: string | function): Schema
  - ✅ number.lessThan(max: number | Ref, message?: string | function): Schema
  - ✅ number.moreThan(min: number | Ref, message?: string | function): Schema
  - ✅ number.positive(message?: string | function): Schema
  - ✅ number.negative(message?: string | function): Schema
  - ✅ number.integer(message?: string | function): Schema
- boolean
  - ✅ boolean.isTrue(message?: string | function): Schema
  - ✅ boolean.isFalse(message?: string | function): Schema
- date
  - ✅ date.min(limit: Date | string | Ref, message?: string | function): Schema
  - ✅ date.max(limit: Date | string | Ref, message?: string | function): Schema
- array
  - ✅ array.of(type: Schema): this
  - ✅ array.length(length: number | Ref, message?: string | function): this
  - ✅ array.min(limit: number | Ref, message?: string | function): this
  - ✅ array.max(limit: number | Ref, message?: string | function): this
- ✅ tuple
- object
  - ✅ object.shape(fields: object, noSortEdges?: Array<[string, string]>): Schema
  - ✅ object.concat(schemaB: ObjectSchema): ObjectSchema
  - ✅ object.pick(keys: string[]): Schema
  - ✅ object.omit(keys: string[]): Schema
  - ✅ object.noUnknown(onlyKnownKeys: boolean = true, message?: string | function): Schema

## About

Distributed under the MIT license. See LICENSE for more information.
