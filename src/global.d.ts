import 'yup'

declare const __DEV__: boolean

declare module 'yup' {
  interface Schema<T, C = object> {
    tests: {
      OPTIONS: {
        name: string
        params?: Record<any, any>
      }
    }[]
    resolve: any
    _options?: {
      strict: boolean
    }
    _nullable: boolean
    _whitelist: {
      has(_: unknown): boolean
      toArray(): unknown[]
    }
    _conditions?: numbmer
    _whitelistError?: function
    _blacklist: RefSet<unknown>
    _blacklistError?: function
  }

  interface SchemaDescription {
    oneOf: unknown[]
    notOneOf: unknown[]
  }
}
