# yup-schema-validator

Fake data generator for yup

# Playground

https://g33ze.sse.codesandbox.io/

# Supported yup API

- ? yup
  - ? yup.reach(schema: Schema, path: string, value?: object, context?: object): Schema
  - ? yup.addMethod(schemaType: Schema, name: string, method: ()=> Schema): void
  - ? yup.ref(path: string, options: { contextPrefix: string }): Ref
  - ? yup.lazy((value: any) => Schema): Lazy
  - ? ValidationError(errors: string | Array<string>, value: any, path: string)
- ? mixed
  - ? mixed.clone(): Schema
  - ? mixed.label(label: string): Schema
  - ? mixed.meta(metadata: object): Schema
  - ? mixed.describe(): SchemaDescription
  - ? mixed.concat(schema: Schema): Schema
  - ? mixed.validate(value: any, options?: object): Promise<any, ValidationError>
  - ? mixed.validateSync(value: any, options?: object): any
  - ? mixed.validateAt(path: string, value: any, options?: object): Promise<any, ValidationError>
  - ? mixed.validateSyncAt(path: string, value: any, options?: object): any
  - ? mixed.isValid(value: any, options?: object): Promise<boolean>
  - ? mixed.isValidSync(value: any, options?: object): boolean
  - ? mixed.cast(value: any, options = {}): any
  - ? mixed.isType(value: any): boolean
  - ? mixed.strict(isStrict: boolean = false): Schema
  - ? mixed.strip(stripField: boolean = true): Schema
  - ? mixed.withMutation(builder: (current: Schema) => void): void
  - ✅ mixed.default(value: any): Schema
  - ? mixed.getDefault(options?: object): Any
  - ? mixed.nullable(isNullable: boolean = true): Schema
  - ✅ mixed.required(message?: string | function): Schema
  - ✅ mixed.notRequired(): Schema Alias: optional()
  - ? mixed.defined(): Schema
  - ? mixed.typeError(message: string): Schema
  - ? mixed.oneOf(arrayOfValues: Array<any>, message?: string | function): Schema Alias: equals
  - ? mixed.notOneOf(arrayOfValues: Array<any>, message?: string | function)
  - ? mixed.when(keys: string | Array<string>, builder: object | (value, schema)=> Schema): Schema
  - ? mixed.test(name: string, message: string | function, test: function): Schema
  - ? mixed.test(options: object): Schema
  - ? mixed.transform((currentValue: any, originalValue: any) => any): Schema
- ? string
  - ✅ string.required(message?: string | function): Schema
  - ✅ string.length(limit: number | Ref, message?: string | function): Schema
  - ✅ string.min(limit: number | Ref, message?: string | function): Schema
  - ✅ string.max(limit: number | Ref, message?: string | function): Schema
  - ✅ string.matches(regex: Regex, message?: string | function): Schema
  - ? string.matches(regex: Regex, options: { message: string, excludeEmptyString: bool }): Schema
  - ✅ string.email(message?: string | function): Schema
  - ✅ string.url(message?: string | function): Schema
  - ✅ string.uuid(message?: string | function): Schema
  - ? string.ensure(): Schema
  - ✅ string.trim(message?: string | function): Schema
  - ⚠ string.lowercase(message?: string | function): Schema
    > only support for default message (locale:es) currently
  - ⚠ string.uppercase(message?: string | function): Schema
    > only support for default message (locale:es) currently
- ? number
  - ✅ number.min(limit: number | Ref, message?: string | function): Schema
  - ✅ number.max(limit: number | Ref, message?: string | function): Schema
  - ⚠ number.lessThan(max: number | Ref, message?: string | function): Schema
    > offset by 0.01 currently
  - ⚠ number.moreThan(min: number | Ref, message?: string | function): Schema
    > offset by 0.01 currently
  - ⚠ number.positive(message?: string | function): Schema
    > offset by 0.01 currently
  - ⚠ number.negative(message?: string | function): Schema
    > offset by 0.01 currently
  - ✅ number.integer(message?: string | function): Schema
  - ? number.truncate(): Schema
  - ? number.round(type: 'floor' | 'ceil' | 'trunc' | 'round' = 'round'): Schema
- ✅ boolean
- ✅ date
  - ✅ date.min(limit: Date | string | Ref, message?: string | function): Schema
  - ✅ date.max(limit: Date | string | Ref, message?: string | function): Schema
- ? array
  - ✅ array.of(type: Schema): Schema
  - ✅ array.length(length: number | Ref, message?: string | function): Schema
  - ✅ array.min(limit: number | Ref, message?: string | function): Schema
  - ✅ array.max(limit: number | Ref, message?: string | function): Schema
  - ? array.ensure(): Schema
  - ? array.compact(rejector: (value) => boolean): Schema
- ? object
  - ? Object schema defaults
  - ✅ object.shape(fields: object, noSortEdges?: Array<[string, string]>): Schema
  - ? object.pick(keys: string[]): Schema
  - ? object.omit(keys: string[]): Schema
  - ? object.getDefaultFromShape(): Record<string, unknown>
  - ? object.from(fromKey: string, toKey: string, alias: boolean = false): this
  - ✅ object.noUnknown(onlyKnownKeys: boolean = true, message?: string | function): Schema
  - ? object.camelCase(): Schema
  - ? object.constantCase(): Schema
