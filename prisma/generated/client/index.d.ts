
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectStepStatus
 * 
 */
export type ProjectStepStatus = $Result.DefaultSelection<Prisma.$ProjectStepStatusPayload>
/**
 * Model ProjectActivity
 * 
 */
export type ProjectActivity = $Result.DefaultSelection<Prisma.$ProjectActivityPayload>
/**
 * Model ProgressReport
 * 
 */
export type ProgressReport = $Result.DefaultSelection<Prisma.$ProgressReportPayload>
/**
 * Model ExamSchedule
 * 
 */
export type ExamSchedule = $Result.DefaultSelection<Prisma.$ExamSchedulePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectStepStatus`: Exposes CRUD operations for the **ProjectStepStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectStepStatuses
    * const projectStepStatuses = await prisma.projectStepStatus.findMany()
    * ```
    */
  get projectStepStatus(): Prisma.ProjectStepStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectActivity`: Exposes CRUD operations for the **ProjectActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectActivities
    * const projectActivities = await prisma.projectActivity.findMany()
    * ```
    */
  get projectActivity(): Prisma.ProjectActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.progressReport`: Exposes CRUD operations for the **ProgressReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProgressReports
    * const progressReports = await prisma.progressReport.findMany()
    * ```
    */
  get progressReport(): Prisma.ProgressReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.examSchedule`: Exposes CRUD operations for the **ExamSchedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExamSchedules
    * const examSchedules = await prisma.examSchedule.findMany()
    * ```
    */
  get examSchedule(): Prisma.ExamScheduleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Admin: 'Admin',
    Project: 'Project',
    ProjectStepStatus: 'ProjectStepStatus',
    ProjectActivity: 'ProjectActivity',
    ProgressReport: 'ProgressReport',
    ExamSchedule: 'ExamSchedule'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "admin" | "project" | "projectStepStatus" | "projectActivity" | "progressReport" | "examSchedule"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectStepStatus: {
        payload: Prisma.$ProjectStepStatusPayload<ExtArgs>
        fields: Prisma.ProjectStepStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectStepStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectStepStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload>
          }
          findFirst: {
            args: Prisma.ProjectStepStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectStepStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload>
          }
          findMany: {
            args: Prisma.ProjectStepStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload>[]
          }
          create: {
            args: Prisma.ProjectStepStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload>
          }
          createMany: {
            args: Prisma.ProjectStepStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectStepStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload>[]
          }
          delete: {
            args: Prisma.ProjectStepStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload>
          }
          update: {
            args: Prisma.ProjectStepStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload>
          }
          deleteMany: {
            args: Prisma.ProjectStepStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectStepStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectStepStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload>[]
          }
          upsert: {
            args: Prisma.ProjectStepStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectStepStatusPayload>
          }
          aggregate: {
            args: Prisma.ProjectStepStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectStepStatus>
          }
          groupBy: {
            args: Prisma.ProjectStepStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectStepStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectStepStatusCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectStepStatusCountAggregateOutputType> | number
          }
        }
      }
      ProjectActivity: {
        payload: Prisma.$ProjectActivityPayload<ExtArgs>
        fields: Prisma.ProjectActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload>
          }
          findFirst: {
            args: Prisma.ProjectActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload>
          }
          findMany: {
            args: Prisma.ProjectActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload>[]
          }
          create: {
            args: Prisma.ProjectActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload>
          }
          createMany: {
            args: Prisma.ProjectActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload>[]
          }
          delete: {
            args: Prisma.ProjectActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload>
          }
          update: {
            args: Prisma.ProjectActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload>
          }
          deleteMany: {
            args: Prisma.ProjectActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload>[]
          }
          upsert: {
            args: Prisma.ProjectActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectActivityPayload>
          }
          aggregate: {
            args: Prisma.ProjectActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectActivity>
          }
          groupBy: {
            args: Prisma.ProjectActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectActivityCountAggregateOutputType> | number
          }
        }
      }
      ProgressReport: {
        payload: Prisma.$ProgressReportPayload<ExtArgs>
        fields: Prisma.ProgressReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgressReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgressReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload>
          }
          findFirst: {
            args: Prisma.ProgressReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgressReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload>
          }
          findMany: {
            args: Prisma.ProgressReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload>[]
          }
          create: {
            args: Prisma.ProgressReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload>
          }
          createMany: {
            args: Prisma.ProgressReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgressReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload>[]
          }
          delete: {
            args: Prisma.ProgressReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload>
          }
          update: {
            args: Prisma.ProgressReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload>
          }
          deleteMany: {
            args: Prisma.ProgressReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgressReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgressReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload>[]
          }
          upsert: {
            args: Prisma.ProgressReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgressReportPayload>
          }
          aggregate: {
            args: Prisma.ProgressReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgressReport>
          }
          groupBy: {
            args: Prisma.ProgressReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgressReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgressReportCountArgs<ExtArgs>
            result: $Utils.Optional<ProgressReportCountAggregateOutputType> | number
          }
        }
      }
      ExamSchedule: {
        payload: Prisma.$ExamSchedulePayload<ExtArgs>
        fields: Prisma.ExamScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExamScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExamScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload>
          }
          findFirst: {
            args: Prisma.ExamScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExamScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload>
          }
          findMany: {
            args: Prisma.ExamScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload>[]
          }
          create: {
            args: Prisma.ExamScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload>
          }
          createMany: {
            args: Prisma.ExamScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExamScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload>[]
          }
          delete: {
            args: Prisma.ExamScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload>
          }
          update: {
            args: Prisma.ExamScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload>
          }
          deleteMany: {
            args: Prisma.ExamScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExamScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExamScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload>[]
          }
          upsert: {
            args: Prisma.ExamScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamSchedulePayload>
          }
          aggregate: {
            args: Prisma.ExamScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExamSchedule>
          }
          groupBy: {
            args: Prisma.ExamScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExamScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExamScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ExamScheduleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    admin?: AdminOmit
    project?: ProjectOmit
    projectStepStatus?: ProjectStepStatusOmit
    projectActivity?: ProjectActivityOmit
    progressReport?: ProgressReportOmit
    examSchedule?: ExamScheduleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    projects1: number
    projects2: number
    advisedProjects: number
    coAdvisedProjects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects1?: boolean | UserCountOutputTypeCountProjects1Args
    projects2?: boolean | UserCountOutputTypeCountProjects2Args
    advisedProjects?: boolean | UserCountOutputTypeCountAdvisedProjectsArgs
    coAdvisedProjects?: boolean | UserCountOutputTypeCountCoAdvisedProjectsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjects1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjects2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAdvisedProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCoAdvisedProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type AdminCountOutputType
   */

  export type AdminCountOutputType = {
    approvedSteps: number
  }

  export type AdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approvedSteps?: boolean | AdminCountOutputTypeCountApprovedStepsArgs
  }

  // Custom InputTypes
  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     */
    select?: AdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountApprovedStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectStepStatusWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    reports: number
    exams: number
    activities: number
    stepStatuses: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | ProjectCountOutputTypeCountReportsArgs
    exams?: boolean | ProjectCountOutputTypeCountExamsArgs
    activities?: boolean | ProjectCountOutputTypeCountActivitiesArgs
    stepStatuses?: boolean | ProjectCountOutputTypeCountStepStatusesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgressReportWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountExamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamScheduleWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectActivityWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountStepStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectStepStatusWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    fullname: string | null
    academicYear: string | null
    tel: string | null
    lineId: string | null
    profileImage: string | null
    role: string | null
    isApproved: boolean | null
    addressNo: string | null
    moo: string | null
    soi: string | null
    road: string | null
    subdistrict: string | null
    district: string | null
    province: string | null
    zipcode: string | null
    homePhone: string | null
    emergencyContact: string | null
    position: string | null
    department: string | null
    expertise: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    fullname: string | null
    academicYear: string | null
    tel: string | null
    lineId: string | null
    profileImage: string | null
    role: string | null
    isApproved: boolean | null
    addressNo: string | null
    moo: string | null
    soi: string | null
    road: string | null
    subdistrict: string | null
    district: string | null
    province: string | null
    zipcode: string | null
    homePhone: string | null
    emergencyContact: string | null
    position: string | null
    department: string | null
    expertise: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    fullname: number
    academicYear: number
    tel: number
    lineId: number
    profileImage: number
    role: number
    isApproved: number
    addressNo: number
    moo: number
    soi: number
    road: number
    subdistrict: number
    district: number
    province: number
    zipcode: number
    homePhone: number
    emergencyContact: number
    position: number
    department: number
    expertise: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    fullname?: true
    academicYear?: true
    tel?: true
    lineId?: true
    profileImage?: true
    role?: true
    isApproved?: true
    addressNo?: true
    moo?: true
    soi?: true
    road?: true
    subdistrict?: true
    district?: true
    province?: true
    zipcode?: true
    homePhone?: true
    emergencyContact?: true
    position?: true
    department?: true
    expertise?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    fullname?: true
    academicYear?: true
    tel?: true
    lineId?: true
    profileImage?: true
    role?: true
    isApproved?: true
    addressNo?: true
    moo?: true
    soi?: true
    road?: true
    subdistrict?: true
    district?: true
    province?: true
    zipcode?: true
    homePhone?: true
    emergencyContact?: true
    position?: true
    department?: true
    expertise?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    fullname?: true
    academicYear?: true
    tel?: true
    lineId?: true
    profileImage?: true
    role?: true
    isApproved?: true
    addressNo?: true
    moo?: true
    soi?: true
    road?: true
    subdistrict?: true
    district?: true
    province?: true
    zipcode?: true
    homePhone?: true
    emergencyContact?: true
    position?: true
    department?: true
    expertise?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    email: string
    password: string
    fullname: string | null
    academicYear: string | null
    tel: string | null
    lineId: string | null
    profileImage: string | null
    role: string
    isApproved: boolean
    addressNo: string | null
    moo: string | null
    soi: string | null
    road: string | null
    subdistrict: string | null
    district: string | null
    province: string | null
    zipcode: string | null
    homePhone: string | null
    emergencyContact: string | null
    position: string | null
    department: string | null
    expertise: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullname?: boolean
    academicYear?: boolean
    tel?: boolean
    lineId?: boolean
    profileImage?: boolean
    role?: boolean
    isApproved?: boolean
    addressNo?: boolean
    moo?: boolean
    soi?: boolean
    road?: boolean
    subdistrict?: boolean
    district?: boolean
    province?: boolean
    zipcode?: boolean
    homePhone?: boolean
    emergencyContact?: boolean
    position?: boolean
    department?: boolean
    expertise?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects1?: boolean | User$projects1Args<ExtArgs>
    projects2?: boolean | User$projects2Args<ExtArgs>
    advisedProjects?: boolean | User$advisedProjectsArgs<ExtArgs>
    coAdvisedProjects?: boolean | User$coAdvisedProjectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullname?: boolean
    academicYear?: boolean
    tel?: boolean
    lineId?: boolean
    profileImage?: boolean
    role?: boolean
    isApproved?: boolean
    addressNo?: boolean
    moo?: boolean
    soi?: boolean
    road?: boolean
    subdistrict?: boolean
    district?: boolean
    province?: boolean
    zipcode?: boolean
    homePhone?: boolean
    emergencyContact?: boolean
    position?: boolean
    department?: boolean
    expertise?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullname?: boolean
    academicYear?: boolean
    tel?: boolean
    lineId?: boolean
    profileImage?: boolean
    role?: boolean
    isApproved?: boolean
    addressNo?: boolean
    moo?: boolean
    soi?: boolean
    road?: boolean
    subdistrict?: boolean
    district?: boolean
    province?: boolean
    zipcode?: boolean
    homePhone?: boolean
    emergencyContact?: boolean
    position?: boolean
    department?: boolean
    expertise?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullname?: boolean
    academicYear?: boolean
    tel?: boolean
    lineId?: boolean
    profileImage?: boolean
    role?: boolean
    isApproved?: boolean
    addressNo?: boolean
    moo?: boolean
    soi?: boolean
    road?: boolean
    subdistrict?: boolean
    district?: boolean
    province?: boolean
    zipcode?: boolean
    homePhone?: boolean
    emergencyContact?: boolean
    position?: boolean
    department?: boolean
    expertise?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "fullname" | "academicYear" | "tel" | "lineId" | "profileImage" | "role" | "isApproved" | "addressNo" | "moo" | "soi" | "road" | "subdistrict" | "district" | "province" | "zipcode" | "homePhone" | "emergencyContact" | "position" | "department" | "expertise" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects1?: boolean | User$projects1Args<ExtArgs>
    projects2?: boolean | User$projects2Args<ExtArgs>
    advisedProjects?: boolean | User$advisedProjectsArgs<ExtArgs>
    coAdvisedProjects?: boolean | User$coAdvisedProjectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projects1: Prisma.$ProjectPayload<ExtArgs>[]
      projects2: Prisma.$ProjectPayload<ExtArgs>[]
      advisedProjects: Prisma.$ProjectPayload<ExtArgs>[]
      coAdvisedProjects: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password: string
      fullname: string | null
      academicYear: string | null
      tel: string | null
      lineId: string | null
      profileImage: string | null
      role: string
      isApproved: boolean
      addressNo: string | null
      moo: string | null
      soi: string | null
      road: string | null
      subdistrict: string | null
      district: string | null
      province: string | null
      zipcode: string | null
      homePhone: string | null
      emergencyContact: string | null
      position: string | null
      department: string | null
      expertise: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects1<T extends User$projects1Args<ExtArgs> = {}>(args?: Subset<T, User$projects1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects2<T extends User$projects2Args<ExtArgs> = {}>(args?: Subset<T, User$projects2Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    advisedProjects<T extends User$advisedProjectsArgs<ExtArgs> = {}>(args?: Subset<T, User$advisedProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    coAdvisedProjects<T extends User$coAdvisedProjectsArgs<ExtArgs> = {}>(args?: Subset<T, User$coAdvisedProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly fullname: FieldRef<"User", 'String'>
    readonly academicYear: FieldRef<"User", 'String'>
    readonly tel: FieldRef<"User", 'String'>
    readonly lineId: FieldRef<"User", 'String'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isApproved: FieldRef<"User", 'Boolean'>
    readonly addressNo: FieldRef<"User", 'String'>
    readonly moo: FieldRef<"User", 'String'>
    readonly soi: FieldRef<"User", 'String'>
    readonly road: FieldRef<"User", 'String'>
    readonly subdistrict: FieldRef<"User", 'String'>
    readonly district: FieldRef<"User", 'String'>
    readonly province: FieldRef<"User", 'String'>
    readonly zipcode: FieldRef<"User", 'String'>
    readonly homePhone: FieldRef<"User", 'String'>
    readonly emergencyContact: FieldRef<"User", 'String'>
    readonly position: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly expertise: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.projects1
   */
  export type User$projects1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.projects2
   */
  export type User$projects2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.advisedProjects
   */
  export type User$advisedProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.coAdvisedProjects
   */
  export type User$coAdvisedProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    fullname: string | null
    email: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    fullname: string | null
    email: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    username: number
    password: number
    fullname: number
    email: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    fullname?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    fullname?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    fullname?: true
    email?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    username: string
    password: string
    fullname: string | null
    email: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    fullname?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    approvedSteps?: boolean | Admin$approvedStepsArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    fullname?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    fullname?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    fullname?: boolean
    email?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "fullname" | "email" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approvedSteps?: boolean | Admin$approvedStepsArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      approvedSteps: Prisma.$ProjectStepStatusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      fullname: string | null
      email: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    approvedSteps<T extends Admin$approvedStepsArgs<ExtArgs> = {}>(args?: Subset<T, Admin$approvedStepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'Int'>
    readonly username: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly fullname: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly role: FieldRef<"Admin", 'String'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin.approvedSteps
   */
  export type Admin$approvedStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    where?: ProjectStepStatusWhereInput
    orderBy?: ProjectStepStatusOrderByWithRelationInput | ProjectStepStatusOrderByWithRelationInput[]
    cursor?: ProjectStepStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectStepStatusScalarFieldEnum | ProjectStepStatusScalarFieldEnum[]
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    id: number | null
    step: number | null
    student1Id: number | null
    student2Id: number | null
    advisorId: number | null
    coAdvisorId: number | null
  }

  export type ProjectSumAggregateOutputType = {
    id: number | null
    step: number | null
    student1Id: number | null
    student2Id: number | null
    advisorId: number | null
    coAdvisorId: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: number | null
    titleTh: string | null
    titleEn: string | null
    semester: string | null
    academicYear: string | null
    step: number | null
    status: string | null
    feedback: string | null
    thesisUrl: string | null
    programUrl: string | null
    manualUrl: string | null
    student1Id: number | null
    student2Id: number | null
    advisorId: number | null
    coAdvisorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: number | null
    titleTh: string | null
    titleEn: string | null
    semester: string | null
    academicYear: string | null
    step: number | null
    status: string | null
    feedback: string | null
    thesisUrl: string | null
    programUrl: string | null
    manualUrl: string | null
    student1Id: number | null
    student2Id: number | null
    advisorId: number | null
    coAdvisorId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    titleTh: number
    titleEn: number
    semester: number
    academicYear: number
    step: number
    status: number
    feedback: number
    thesisUrl: number
    programUrl: number
    manualUrl: number
    student1Id: number
    student2Id: number
    advisorId: number
    coAdvisorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    id?: true
    step?: true
    student1Id?: true
    student2Id?: true
    advisorId?: true
    coAdvisorId?: true
  }

  export type ProjectSumAggregateInputType = {
    id?: true
    step?: true
    student1Id?: true
    student2Id?: true
    advisorId?: true
    coAdvisorId?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    titleTh?: true
    titleEn?: true
    semester?: true
    academicYear?: true
    step?: true
    status?: true
    feedback?: true
    thesisUrl?: true
    programUrl?: true
    manualUrl?: true
    student1Id?: true
    student2Id?: true
    advisorId?: true
    coAdvisorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    titleTh?: true
    titleEn?: true
    semester?: true
    academicYear?: true
    step?: true
    status?: true
    feedback?: true
    thesisUrl?: true
    programUrl?: true
    manualUrl?: true
    student1Id?: true
    student2Id?: true
    advisorId?: true
    coAdvisorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    titleTh?: true
    titleEn?: true
    semester?: true
    academicYear?: true
    step?: true
    status?: true
    feedback?: true
    thesisUrl?: true
    programUrl?: true
    manualUrl?: true
    student1Id?: true
    student2Id?: true
    advisorId?: true
    coAdvisorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: number
    titleTh: string
    titleEn: string | null
    semester: string | null
    academicYear: string | null
    step: number
    status: string
    feedback: string | null
    thesisUrl: string | null
    programUrl: string | null
    manualUrl: string | null
    student1Id: number
    student2Id: number | null
    advisorId: number | null
    coAdvisorId: number | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titleTh?: boolean
    titleEn?: boolean
    semester?: boolean
    academicYear?: boolean
    step?: boolean
    status?: boolean
    feedback?: boolean
    thesisUrl?: boolean
    programUrl?: boolean
    manualUrl?: boolean
    student1Id?: boolean
    student2Id?: boolean
    advisorId?: boolean
    coAdvisorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student1?: boolean | UserDefaultArgs<ExtArgs>
    student2?: boolean | Project$student2Args<ExtArgs>
    advisor?: boolean | Project$advisorArgs<ExtArgs>
    coAdvisor?: boolean | Project$coAdvisorArgs<ExtArgs>
    reports?: boolean | Project$reportsArgs<ExtArgs>
    exams?: boolean | Project$examsArgs<ExtArgs>
    activities?: boolean | Project$activitiesArgs<ExtArgs>
    stepStatuses?: boolean | Project$stepStatusesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titleTh?: boolean
    titleEn?: boolean
    semester?: boolean
    academicYear?: boolean
    step?: boolean
    status?: boolean
    feedback?: boolean
    thesisUrl?: boolean
    programUrl?: boolean
    manualUrl?: boolean
    student1Id?: boolean
    student2Id?: boolean
    advisorId?: boolean
    coAdvisorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student1?: boolean | UserDefaultArgs<ExtArgs>
    student2?: boolean | Project$student2Args<ExtArgs>
    advisor?: boolean | Project$advisorArgs<ExtArgs>
    coAdvisor?: boolean | Project$coAdvisorArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titleTh?: boolean
    titleEn?: boolean
    semester?: boolean
    academicYear?: boolean
    step?: boolean
    status?: boolean
    feedback?: boolean
    thesisUrl?: boolean
    programUrl?: boolean
    manualUrl?: boolean
    student1Id?: boolean
    student2Id?: boolean
    advisorId?: boolean
    coAdvisorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student1?: boolean | UserDefaultArgs<ExtArgs>
    student2?: boolean | Project$student2Args<ExtArgs>
    advisor?: boolean | Project$advisorArgs<ExtArgs>
    coAdvisor?: boolean | Project$coAdvisorArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    titleTh?: boolean
    titleEn?: boolean
    semester?: boolean
    academicYear?: boolean
    step?: boolean
    status?: boolean
    feedback?: boolean
    thesisUrl?: boolean
    programUrl?: boolean
    manualUrl?: boolean
    student1Id?: boolean
    student2Id?: boolean
    advisorId?: boolean
    coAdvisorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titleTh" | "titleEn" | "semester" | "academicYear" | "step" | "status" | "feedback" | "thesisUrl" | "programUrl" | "manualUrl" | "student1Id" | "student2Id" | "advisorId" | "coAdvisorId" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student1?: boolean | UserDefaultArgs<ExtArgs>
    student2?: boolean | Project$student2Args<ExtArgs>
    advisor?: boolean | Project$advisorArgs<ExtArgs>
    coAdvisor?: boolean | Project$coAdvisorArgs<ExtArgs>
    reports?: boolean | Project$reportsArgs<ExtArgs>
    exams?: boolean | Project$examsArgs<ExtArgs>
    activities?: boolean | Project$activitiesArgs<ExtArgs>
    stepStatuses?: boolean | Project$stepStatusesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student1?: boolean | UserDefaultArgs<ExtArgs>
    student2?: boolean | Project$student2Args<ExtArgs>
    advisor?: boolean | Project$advisorArgs<ExtArgs>
    coAdvisor?: boolean | Project$coAdvisorArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student1?: boolean | UserDefaultArgs<ExtArgs>
    student2?: boolean | Project$student2Args<ExtArgs>
    advisor?: boolean | Project$advisorArgs<ExtArgs>
    coAdvisor?: boolean | Project$coAdvisorArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      student1: Prisma.$UserPayload<ExtArgs>
      student2: Prisma.$UserPayload<ExtArgs> | null
      advisor: Prisma.$UserPayload<ExtArgs> | null
      coAdvisor: Prisma.$UserPayload<ExtArgs> | null
      reports: Prisma.$ProgressReportPayload<ExtArgs>[]
      exams: Prisma.$ExamSchedulePayload<ExtArgs>[]
      activities: Prisma.$ProjectActivityPayload<ExtArgs>[]
      stepStatuses: Prisma.$ProjectStepStatusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titleTh: string
      titleEn: string | null
      semester: string | null
      academicYear: string | null
      step: number
      status: string
      feedback: string | null
      thesisUrl: string | null
      programUrl: string | null
      manualUrl: string | null
      student1Id: number
      student2Id: number | null
      advisorId: number | null
      coAdvisorId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student1<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student2<T extends Project$student2Args<ExtArgs> = {}>(args?: Subset<T, Project$student2Args<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    advisor<T extends Project$advisorArgs<ExtArgs> = {}>(args?: Subset<T, Project$advisorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    coAdvisor<T extends Project$coAdvisorArgs<ExtArgs> = {}>(args?: Subset<T, Project$coAdvisorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reports<T extends Project$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Project$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exams<T extends Project$examsArgs<ExtArgs> = {}>(args?: Subset<T, Project$examsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activities<T extends Project$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Project$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stepStatuses<T extends Project$stepStatusesArgs<ExtArgs> = {}>(args?: Subset<T, Project$stepStatusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'Int'>
    readonly titleTh: FieldRef<"Project", 'String'>
    readonly titleEn: FieldRef<"Project", 'String'>
    readonly semester: FieldRef<"Project", 'String'>
    readonly academicYear: FieldRef<"Project", 'String'>
    readonly step: FieldRef<"Project", 'Int'>
    readonly status: FieldRef<"Project", 'String'>
    readonly feedback: FieldRef<"Project", 'String'>
    readonly thesisUrl: FieldRef<"Project", 'String'>
    readonly programUrl: FieldRef<"Project", 'String'>
    readonly manualUrl: FieldRef<"Project", 'String'>
    readonly student1Id: FieldRef<"Project", 'Int'>
    readonly student2Id: FieldRef<"Project", 'Int'>
    readonly advisorId: FieldRef<"Project", 'Int'>
    readonly coAdvisorId: FieldRef<"Project", 'Int'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.student2
   */
  export type Project$student2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Project.advisor
   */
  export type Project$advisorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Project.coAdvisor
   */
  export type Project$coAdvisorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Project.reports
   */
  export type Project$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    where?: ProgressReportWhereInput
    orderBy?: ProgressReportOrderByWithRelationInput | ProgressReportOrderByWithRelationInput[]
    cursor?: ProgressReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgressReportScalarFieldEnum | ProgressReportScalarFieldEnum[]
  }

  /**
   * Project.exams
   */
  export type Project$examsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    where?: ExamScheduleWhereInput
    orderBy?: ExamScheduleOrderByWithRelationInput | ExamScheduleOrderByWithRelationInput[]
    cursor?: ExamScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExamScheduleScalarFieldEnum | ExamScheduleScalarFieldEnum[]
  }

  /**
   * Project.activities
   */
  export type Project$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    where?: ProjectActivityWhereInput
    orderBy?: ProjectActivityOrderByWithRelationInput | ProjectActivityOrderByWithRelationInput[]
    cursor?: ProjectActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectActivityScalarFieldEnum | ProjectActivityScalarFieldEnum[]
  }

  /**
   * Project.stepStatuses
   */
  export type Project$stepStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    where?: ProjectStepStatusWhereInput
    orderBy?: ProjectStepStatusOrderByWithRelationInput | ProjectStepStatusOrderByWithRelationInput[]
    cursor?: ProjectStepStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectStepStatusScalarFieldEnum | ProjectStepStatusScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectStepStatus
   */

  export type AggregateProjectStepStatus = {
    _count: ProjectStepStatusCountAggregateOutputType | null
    _avg: ProjectStepStatusAvgAggregateOutputType | null
    _sum: ProjectStepStatusSumAggregateOutputType | null
    _min: ProjectStepStatusMinAggregateOutputType | null
    _max: ProjectStepStatusMaxAggregateOutputType | null
  }

  export type ProjectStepStatusAvgAggregateOutputType = {
    id: number | null
    projectId: number | null
    step: number | null
    approvedById: number | null
  }

  export type ProjectStepStatusSumAggregateOutputType = {
    id: number | null
    projectId: number | null
    step: number | null
    approvedById: number | null
  }

  export type ProjectStepStatusMinAggregateOutputType = {
    id: number | null
    projectId: number | null
    step: number | null
    status: string | null
    feedback: string | null
    approvedById: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type ProjectStepStatusMaxAggregateOutputType = {
    id: number | null
    projectId: number | null
    step: number | null
    status: string | null
    feedback: string | null
    approvedById: number | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type ProjectStepStatusCountAggregateOutputType = {
    id: number
    projectId: number
    step: number
    status: number
    feedback: number
    approvedById: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type ProjectStepStatusAvgAggregateInputType = {
    id?: true
    projectId?: true
    step?: true
    approvedById?: true
  }

  export type ProjectStepStatusSumAggregateInputType = {
    id?: true
    projectId?: true
    step?: true
    approvedById?: true
  }

  export type ProjectStepStatusMinAggregateInputType = {
    id?: true
    projectId?: true
    step?: true
    status?: true
    feedback?: true
    approvedById?: true
    updatedAt?: true
    createdAt?: true
  }

  export type ProjectStepStatusMaxAggregateInputType = {
    id?: true
    projectId?: true
    step?: true
    status?: true
    feedback?: true
    approvedById?: true
    updatedAt?: true
    createdAt?: true
  }

  export type ProjectStepStatusCountAggregateInputType = {
    id?: true
    projectId?: true
    step?: true
    status?: true
    feedback?: true
    approvedById?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ProjectStepStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectStepStatus to aggregate.
     */
    where?: ProjectStepStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStepStatuses to fetch.
     */
    orderBy?: ProjectStepStatusOrderByWithRelationInput | ProjectStepStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectStepStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStepStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStepStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectStepStatuses
    **/
    _count?: true | ProjectStepStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectStepStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectStepStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectStepStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectStepStatusMaxAggregateInputType
  }

  export type GetProjectStepStatusAggregateType<T extends ProjectStepStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectStepStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectStepStatus[P]>
      : GetScalarType<T[P], AggregateProjectStepStatus[P]>
  }




  export type ProjectStepStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectStepStatusWhereInput
    orderBy?: ProjectStepStatusOrderByWithAggregationInput | ProjectStepStatusOrderByWithAggregationInput[]
    by: ProjectStepStatusScalarFieldEnum[] | ProjectStepStatusScalarFieldEnum
    having?: ProjectStepStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectStepStatusCountAggregateInputType | true
    _avg?: ProjectStepStatusAvgAggregateInputType
    _sum?: ProjectStepStatusSumAggregateInputType
    _min?: ProjectStepStatusMinAggregateInputType
    _max?: ProjectStepStatusMaxAggregateInputType
  }

  export type ProjectStepStatusGroupByOutputType = {
    id: number
    projectId: number
    step: number
    status: string
    feedback: string | null
    approvedById: number | null
    updatedAt: Date
    createdAt: Date
    _count: ProjectStepStatusCountAggregateOutputType | null
    _avg: ProjectStepStatusAvgAggregateOutputType | null
    _sum: ProjectStepStatusSumAggregateOutputType | null
    _min: ProjectStepStatusMinAggregateOutputType | null
    _max: ProjectStepStatusMaxAggregateOutputType | null
  }

  type GetProjectStepStatusGroupByPayload<T extends ProjectStepStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectStepStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectStepStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectStepStatusGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectStepStatusGroupByOutputType[P]>
        }
      >
    >


  export type ProjectStepStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    step?: boolean
    status?: boolean
    feedback?: boolean
    approvedById?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    approvedBy?: boolean | ProjectStepStatus$approvedByArgs<ExtArgs>
  }, ExtArgs["result"]["projectStepStatus"]>

  export type ProjectStepStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    step?: boolean
    status?: boolean
    feedback?: boolean
    approvedById?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    approvedBy?: boolean | ProjectStepStatus$approvedByArgs<ExtArgs>
  }, ExtArgs["result"]["projectStepStatus"]>

  export type ProjectStepStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    step?: boolean
    status?: boolean
    feedback?: boolean
    approvedById?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    approvedBy?: boolean | ProjectStepStatus$approvedByArgs<ExtArgs>
  }, ExtArgs["result"]["projectStepStatus"]>

  export type ProjectStepStatusSelectScalar = {
    id?: boolean
    projectId?: boolean
    step?: boolean
    status?: boolean
    feedback?: boolean
    approvedById?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type ProjectStepStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "step" | "status" | "feedback" | "approvedById" | "updatedAt" | "createdAt", ExtArgs["result"]["projectStepStatus"]>
  export type ProjectStepStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    approvedBy?: boolean | ProjectStepStatus$approvedByArgs<ExtArgs>
  }
  export type ProjectStepStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    approvedBy?: boolean | ProjectStepStatus$approvedByArgs<ExtArgs>
  }
  export type ProjectStepStatusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    approvedBy?: boolean | ProjectStepStatus$approvedByArgs<ExtArgs>
  }

  export type $ProjectStepStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectStepStatus"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      approvedBy: Prisma.$AdminPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: number
      step: number
      status: string
      feedback: string | null
      approvedById: number | null
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["projectStepStatus"]>
    composites: {}
  }

  type ProjectStepStatusGetPayload<S extends boolean | null | undefined | ProjectStepStatusDefaultArgs> = $Result.GetResult<Prisma.$ProjectStepStatusPayload, S>

  type ProjectStepStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectStepStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectStepStatusCountAggregateInputType | true
    }

  export interface ProjectStepStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectStepStatus'], meta: { name: 'ProjectStepStatus' } }
    /**
     * Find zero or one ProjectStepStatus that matches the filter.
     * @param {ProjectStepStatusFindUniqueArgs} args - Arguments to find a ProjectStepStatus
     * @example
     * // Get one ProjectStepStatus
     * const projectStepStatus = await prisma.projectStepStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectStepStatusFindUniqueArgs>(args: SelectSubset<T, ProjectStepStatusFindUniqueArgs<ExtArgs>>): Prisma__ProjectStepStatusClient<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectStepStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectStepStatusFindUniqueOrThrowArgs} args - Arguments to find a ProjectStepStatus
     * @example
     * // Get one ProjectStepStatus
     * const projectStepStatus = await prisma.projectStepStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectStepStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectStepStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectStepStatusClient<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectStepStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStepStatusFindFirstArgs} args - Arguments to find a ProjectStepStatus
     * @example
     * // Get one ProjectStepStatus
     * const projectStepStatus = await prisma.projectStepStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectStepStatusFindFirstArgs>(args?: SelectSubset<T, ProjectStepStatusFindFirstArgs<ExtArgs>>): Prisma__ProjectStepStatusClient<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectStepStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStepStatusFindFirstOrThrowArgs} args - Arguments to find a ProjectStepStatus
     * @example
     * // Get one ProjectStepStatus
     * const projectStepStatus = await prisma.projectStepStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectStepStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectStepStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectStepStatusClient<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectStepStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStepStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectStepStatuses
     * const projectStepStatuses = await prisma.projectStepStatus.findMany()
     * 
     * // Get first 10 ProjectStepStatuses
     * const projectStepStatuses = await prisma.projectStepStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectStepStatusWithIdOnly = await prisma.projectStepStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectStepStatusFindManyArgs>(args?: SelectSubset<T, ProjectStepStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectStepStatus.
     * @param {ProjectStepStatusCreateArgs} args - Arguments to create a ProjectStepStatus.
     * @example
     * // Create one ProjectStepStatus
     * const ProjectStepStatus = await prisma.projectStepStatus.create({
     *   data: {
     *     // ... data to create a ProjectStepStatus
     *   }
     * })
     * 
     */
    create<T extends ProjectStepStatusCreateArgs>(args: SelectSubset<T, ProjectStepStatusCreateArgs<ExtArgs>>): Prisma__ProjectStepStatusClient<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectStepStatuses.
     * @param {ProjectStepStatusCreateManyArgs} args - Arguments to create many ProjectStepStatuses.
     * @example
     * // Create many ProjectStepStatuses
     * const projectStepStatus = await prisma.projectStepStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectStepStatusCreateManyArgs>(args?: SelectSubset<T, ProjectStepStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectStepStatuses and returns the data saved in the database.
     * @param {ProjectStepStatusCreateManyAndReturnArgs} args - Arguments to create many ProjectStepStatuses.
     * @example
     * // Create many ProjectStepStatuses
     * const projectStepStatus = await prisma.projectStepStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectStepStatuses and only return the `id`
     * const projectStepStatusWithIdOnly = await prisma.projectStepStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectStepStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectStepStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectStepStatus.
     * @param {ProjectStepStatusDeleteArgs} args - Arguments to delete one ProjectStepStatus.
     * @example
     * // Delete one ProjectStepStatus
     * const ProjectStepStatus = await prisma.projectStepStatus.delete({
     *   where: {
     *     // ... filter to delete one ProjectStepStatus
     *   }
     * })
     * 
     */
    delete<T extends ProjectStepStatusDeleteArgs>(args: SelectSubset<T, ProjectStepStatusDeleteArgs<ExtArgs>>): Prisma__ProjectStepStatusClient<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectStepStatus.
     * @param {ProjectStepStatusUpdateArgs} args - Arguments to update one ProjectStepStatus.
     * @example
     * // Update one ProjectStepStatus
     * const projectStepStatus = await prisma.projectStepStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectStepStatusUpdateArgs>(args: SelectSubset<T, ProjectStepStatusUpdateArgs<ExtArgs>>): Prisma__ProjectStepStatusClient<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectStepStatuses.
     * @param {ProjectStepStatusDeleteManyArgs} args - Arguments to filter ProjectStepStatuses to delete.
     * @example
     * // Delete a few ProjectStepStatuses
     * const { count } = await prisma.projectStepStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectStepStatusDeleteManyArgs>(args?: SelectSubset<T, ProjectStepStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectStepStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStepStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectStepStatuses
     * const projectStepStatus = await prisma.projectStepStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectStepStatusUpdateManyArgs>(args: SelectSubset<T, ProjectStepStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectStepStatuses and returns the data updated in the database.
     * @param {ProjectStepStatusUpdateManyAndReturnArgs} args - Arguments to update many ProjectStepStatuses.
     * @example
     * // Update many ProjectStepStatuses
     * const projectStepStatus = await prisma.projectStepStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectStepStatuses and only return the `id`
     * const projectStepStatusWithIdOnly = await prisma.projectStepStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectStepStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectStepStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectStepStatus.
     * @param {ProjectStepStatusUpsertArgs} args - Arguments to update or create a ProjectStepStatus.
     * @example
     * // Update or create a ProjectStepStatus
     * const projectStepStatus = await prisma.projectStepStatus.upsert({
     *   create: {
     *     // ... data to create a ProjectStepStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectStepStatus we want to update
     *   }
     * })
     */
    upsert<T extends ProjectStepStatusUpsertArgs>(args: SelectSubset<T, ProjectStepStatusUpsertArgs<ExtArgs>>): Prisma__ProjectStepStatusClient<$Result.GetResult<Prisma.$ProjectStepStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectStepStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStepStatusCountArgs} args - Arguments to filter ProjectStepStatuses to count.
     * @example
     * // Count the number of ProjectStepStatuses
     * const count = await prisma.projectStepStatus.count({
     *   where: {
     *     // ... the filter for the ProjectStepStatuses we want to count
     *   }
     * })
    **/
    count<T extends ProjectStepStatusCountArgs>(
      args?: Subset<T, ProjectStepStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectStepStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectStepStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStepStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectStepStatusAggregateArgs>(args: Subset<T, ProjectStepStatusAggregateArgs>): Prisma.PrismaPromise<GetProjectStepStatusAggregateType<T>>

    /**
     * Group by ProjectStepStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectStepStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectStepStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectStepStatusGroupByArgs['orderBy'] }
        : { orderBy?: ProjectStepStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectStepStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectStepStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectStepStatus model
   */
  readonly fields: ProjectStepStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectStepStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectStepStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approvedBy<T extends ProjectStepStatus$approvedByArgs<ExtArgs> = {}>(args?: Subset<T, ProjectStepStatus$approvedByArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectStepStatus model
   */
  interface ProjectStepStatusFieldRefs {
    readonly id: FieldRef<"ProjectStepStatus", 'Int'>
    readonly projectId: FieldRef<"ProjectStepStatus", 'Int'>
    readonly step: FieldRef<"ProjectStepStatus", 'Int'>
    readonly status: FieldRef<"ProjectStepStatus", 'String'>
    readonly feedback: FieldRef<"ProjectStepStatus", 'String'>
    readonly approvedById: FieldRef<"ProjectStepStatus", 'Int'>
    readonly updatedAt: FieldRef<"ProjectStepStatus", 'DateTime'>
    readonly createdAt: FieldRef<"ProjectStepStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectStepStatus findUnique
   */
  export type ProjectStepStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStepStatus to fetch.
     */
    where: ProjectStepStatusWhereUniqueInput
  }

  /**
   * ProjectStepStatus findUniqueOrThrow
   */
  export type ProjectStepStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStepStatus to fetch.
     */
    where: ProjectStepStatusWhereUniqueInput
  }

  /**
   * ProjectStepStatus findFirst
   */
  export type ProjectStepStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStepStatus to fetch.
     */
    where?: ProjectStepStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStepStatuses to fetch.
     */
    orderBy?: ProjectStepStatusOrderByWithRelationInput | ProjectStepStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectStepStatuses.
     */
    cursor?: ProjectStepStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStepStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStepStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectStepStatuses.
     */
    distinct?: ProjectStepStatusScalarFieldEnum | ProjectStepStatusScalarFieldEnum[]
  }

  /**
   * ProjectStepStatus findFirstOrThrow
   */
  export type ProjectStepStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStepStatus to fetch.
     */
    where?: ProjectStepStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStepStatuses to fetch.
     */
    orderBy?: ProjectStepStatusOrderByWithRelationInput | ProjectStepStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectStepStatuses.
     */
    cursor?: ProjectStepStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStepStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStepStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectStepStatuses.
     */
    distinct?: ProjectStepStatusScalarFieldEnum | ProjectStepStatusScalarFieldEnum[]
  }

  /**
   * ProjectStepStatus findMany
   */
  export type ProjectStepStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    /**
     * Filter, which ProjectStepStatuses to fetch.
     */
    where?: ProjectStepStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectStepStatuses to fetch.
     */
    orderBy?: ProjectStepStatusOrderByWithRelationInput | ProjectStepStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectStepStatuses.
     */
    cursor?: ProjectStepStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectStepStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectStepStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectStepStatuses.
     */
    distinct?: ProjectStepStatusScalarFieldEnum | ProjectStepStatusScalarFieldEnum[]
  }

  /**
   * ProjectStepStatus create
   */
  export type ProjectStepStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectStepStatus.
     */
    data: XOR<ProjectStepStatusCreateInput, ProjectStepStatusUncheckedCreateInput>
  }

  /**
   * ProjectStepStatus createMany
   */
  export type ProjectStepStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectStepStatuses.
     */
    data: ProjectStepStatusCreateManyInput | ProjectStepStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectStepStatus createManyAndReturn
   */
  export type ProjectStepStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectStepStatuses.
     */
    data: ProjectStepStatusCreateManyInput | ProjectStepStatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectStepStatus update
   */
  export type ProjectStepStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectStepStatus.
     */
    data: XOR<ProjectStepStatusUpdateInput, ProjectStepStatusUncheckedUpdateInput>
    /**
     * Choose, which ProjectStepStatus to update.
     */
    where: ProjectStepStatusWhereUniqueInput
  }

  /**
   * ProjectStepStatus updateMany
   */
  export type ProjectStepStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectStepStatuses.
     */
    data: XOR<ProjectStepStatusUpdateManyMutationInput, ProjectStepStatusUncheckedUpdateManyInput>
    /**
     * Filter which ProjectStepStatuses to update
     */
    where?: ProjectStepStatusWhereInput
    /**
     * Limit how many ProjectStepStatuses to update.
     */
    limit?: number
  }

  /**
   * ProjectStepStatus updateManyAndReturn
   */
  export type ProjectStepStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * The data used to update ProjectStepStatuses.
     */
    data: XOR<ProjectStepStatusUpdateManyMutationInput, ProjectStepStatusUncheckedUpdateManyInput>
    /**
     * Filter which ProjectStepStatuses to update
     */
    where?: ProjectStepStatusWhereInput
    /**
     * Limit how many ProjectStepStatuses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectStepStatus upsert
   */
  export type ProjectStepStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectStepStatus to update in case it exists.
     */
    where: ProjectStepStatusWhereUniqueInput
    /**
     * In case the ProjectStepStatus found by the `where` argument doesn't exist, create a new ProjectStepStatus with this data.
     */
    create: XOR<ProjectStepStatusCreateInput, ProjectStepStatusUncheckedCreateInput>
    /**
     * In case the ProjectStepStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectStepStatusUpdateInput, ProjectStepStatusUncheckedUpdateInput>
  }

  /**
   * ProjectStepStatus delete
   */
  export type ProjectStepStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
    /**
     * Filter which ProjectStepStatus to delete.
     */
    where: ProjectStepStatusWhereUniqueInput
  }

  /**
   * ProjectStepStatus deleteMany
   */
  export type ProjectStepStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectStepStatuses to delete
     */
    where?: ProjectStepStatusWhereInput
    /**
     * Limit how many ProjectStepStatuses to delete.
     */
    limit?: number
  }

  /**
   * ProjectStepStatus.approvedBy
   */
  export type ProjectStepStatus$approvedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
  }

  /**
   * ProjectStepStatus without action
   */
  export type ProjectStepStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectStepStatus
     */
    select?: ProjectStepStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectStepStatus
     */
    omit?: ProjectStepStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectStepStatusInclude<ExtArgs> | null
  }


  /**
   * Model ProjectActivity
   */

  export type AggregateProjectActivity = {
    _count: ProjectActivityCountAggregateOutputType | null
    _avg: ProjectActivityAvgAggregateOutputType | null
    _sum: ProjectActivitySumAggregateOutputType | null
    _min: ProjectActivityMinAggregateOutputType | null
    _max: ProjectActivityMaxAggregateOutputType | null
  }

  export type ProjectActivityAvgAggregateOutputType = {
    id: number | null
    projectId: number | null
  }

  export type ProjectActivitySumAggregateOutputType = {
    id: number | null
    projectId: number | null
  }

  export type ProjectActivityMinAggregateOutputType = {
    id: number | null
    projectId: number | null
    type: string | null
    title: string | null
    description: string | null
    status: string | null
    icon: string | null
    actorName: string | null
    createdAt: Date | null
  }

  export type ProjectActivityMaxAggregateOutputType = {
    id: number | null
    projectId: number | null
    type: string | null
    title: string | null
    description: string | null
    status: string | null
    icon: string | null
    actorName: string | null
    createdAt: Date | null
  }

  export type ProjectActivityCountAggregateOutputType = {
    id: number
    projectId: number
    type: number
    title: number
    description: number
    status: number
    icon: number
    actorName: number
    createdAt: number
    _all: number
  }


  export type ProjectActivityAvgAggregateInputType = {
    id?: true
    projectId?: true
  }

  export type ProjectActivitySumAggregateInputType = {
    id?: true
    projectId?: true
  }

  export type ProjectActivityMinAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    title?: true
    description?: true
    status?: true
    icon?: true
    actorName?: true
    createdAt?: true
  }

  export type ProjectActivityMaxAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    title?: true
    description?: true
    status?: true
    icon?: true
    actorName?: true
    createdAt?: true
  }

  export type ProjectActivityCountAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    title?: true
    description?: true
    status?: true
    icon?: true
    actorName?: true
    createdAt?: true
    _all?: true
  }

  export type ProjectActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectActivity to aggregate.
     */
    where?: ProjectActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectActivities to fetch.
     */
    orderBy?: ProjectActivityOrderByWithRelationInput | ProjectActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectActivities
    **/
    _count?: true | ProjectActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectActivityMaxAggregateInputType
  }

  export type GetProjectActivityAggregateType<T extends ProjectActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectActivity[P]>
      : GetScalarType<T[P], AggregateProjectActivity[P]>
  }




  export type ProjectActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectActivityWhereInput
    orderBy?: ProjectActivityOrderByWithAggregationInput | ProjectActivityOrderByWithAggregationInput[]
    by: ProjectActivityScalarFieldEnum[] | ProjectActivityScalarFieldEnum
    having?: ProjectActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectActivityCountAggregateInputType | true
    _avg?: ProjectActivityAvgAggregateInputType
    _sum?: ProjectActivitySumAggregateInputType
    _min?: ProjectActivityMinAggregateInputType
    _max?: ProjectActivityMaxAggregateInputType
  }

  export type ProjectActivityGroupByOutputType = {
    id: number
    projectId: number
    type: string
    title: string
    description: string | null
    status: string | null
    icon: string | null
    actorName: string | null
    createdAt: Date
    _count: ProjectActivityCountAggregateOutputType | null
    _avg: ProjectActivityAvgAggregateOutputType | null
    _sum: ProjectActivitySumAggregateOutputType | null
    _min: ProjectActivityMinAggregateOutputType | null
    _max: ProjectActivityMaxAggregateOutputType | null
  }

  type GetProjectActivityGroupByPayload<T extends ProjectActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectActivityGroupByOutputType[P]>
        }
      >
    >


  export type ProjectActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    icon?: boolean
    actorName?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectActivity"]>

  export type ProjectActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    icon?: boolean
    actorName?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectActivity"]>

  export type ProjectActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    icon?: boolean
    actorName?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectActivity"]>

  export type ProjectActivitySelectScalar = {
    id?: boolean
    projectId?: boolean
    type?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    icon?: boolean
    actorName?: boolean
    createdAt?: boolean
  }

  export type ProjectActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "type" | "title" | "description" | "status" | "icon" | "actorName" | "createdAt", ExtArgs["result"]["projectActivity"]>
  export type ProjectActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectActivity"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: number
      type: string
      title: string
      description: string | null
      status: string | null
      icon: string | null
      actorName: string | null
      createdAt: Date
    }, ExtArgs["result"]["projectActivity"]>
    composites: {}
  }

  type ProjectActivityGetPayload<S extends boolean | null | undefined | ProjectActivityDefaultArgs> = $Result.GetResult<Prisma.$ProjectActivityPayload, S>

  type ProjectActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectActivityCountAggregateInputType | true
    }

  export interface ProjectActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectActivity'], meta: { name: 'ProjectActivity' } }
    /**
     * Find zero or one ProjectActivity that matches the filter.
     * @param {ProjectActivityFindUniqueArgs} args - Arguments to find a ProjectActivity
     * @example
     * // Get one ProjectActivity
     * const projectActivity = await prisma.projectActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectActivityFindUniqueArgs>(args: SelectSubset<T, ProjectActivityFindUniqueArgs<ExtArgs>>): Prisma__ProjectActivityClient<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectActivityFindUniqueOrThrowArgs} args - Arguments to find a ProjectActivity
     * @example
     * // Get one ProjectActivity
     * const projectActivity = await prisma.projectActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectActivityClient<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectActivityFindFirstArgs} args - Arguments to find a ProjectActivity
     * @example
     * // Get one ProjectActivity
     * const projectActivity = await prisma.projectActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectActivityFindFirstArgs>(args?: SelectSubset<T, ProjectActivityFindFirstArgs<ExtArgs>>): Prisma__ProjectActivityClient<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectActivityFindFirstOrThrowArgs} args - Arguments to find a ProjectActivity
     * @example
     * // Get one ProjectActivity
     * const projectActivity = await prisma.projectActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectActivityClient<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectActivities
     * const projectActivities = await prisma.projectActivity.findMany()
     * 
     * // Get first 10 ProjectActivities
     * const projectActivities = await prisma.projectActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectActivityWithIdOnly = await prisma.projectActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectActivityFindManyArgs>(args?: SelectSubset<T, ProjectActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectActivity.
     * @param {ProjectActivityCreateArgs} args - Arguments to create a ProjectActivity.
     * @example
     * // Create one ProjectActivity
     * const ProjectActivity = await prisma.projectActivity.create({
     *   data: {
     *     // ... data to create a ProjectActivity
     *   }
     * })
     * 
     */
    create<T extends ProjectActivityCreateArgs>(args: SelectSubset<T, ProjectActivityCreateArgs<ExtArgs>>): Prisma__ProjectActivityClient<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectActivities.
     * @param {ProjectActivityCreateManyArgs} args - Arguments to create many ProjectActivities.
     * @example
     * // Create many ProjectActivities
     * const projectActivity = await prisma.projectActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectActivityCreateManyArgs>(args?: SelectSubset<T, ProjectActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectActivities and returns the data saved in the database.
     * @param {ProjectActivityCreateManyAndReturnArgs} args - Arguments to create many ProjectActivities.
     * @example
     * // Create many ProjectActivities
     * const projectActivity = await prisma.projectActivity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectActivities and only return the `id`
     * const projectActivityWithIdOnly = await prisma.projectActivity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectActivity.
     * @param {ProjectActivityDeleteArgs} args - Arguments to delete one ProjectActivity.
     * @example
     * // Delete one ProjectActivity
     * const ProjectActivity = await prisma.projectActivity.delete({
     *   where: {
     *     // ... filter to delete one ProjectActivity
     *   }
     * })
     * 
     */
    delete<T extends ProjectActivityDeleteArgs>(args: SelectSubset<T, ProjectActivityDeleteArgs<ExtArgs>>): Prisma__ProjectActivityClient<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectActivity.
     * @param {ProjectActivityUpdateArgs} args - Arguments to update one ProjectActivity.
     * @example
     * // Update one ProjectActivity
     * const projectActivity = await prisma.projectActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectActivityUpdateArgs>(args: SelectSubset<T, ProjectActivityUpdateArgs<ExtArgs>>): Prisma__ProjectActivityClient<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectActivities.
     * @param {ProjectActivityDeleteManyArgs} args - Arguments to filter ProjectActivities to delete.
     * @example
     * // Delete a few ProjectActivities
     * const { count } = await prisma.projectActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectActivityDeleteManyArgs>(args?: SelectSubset<T, ProjectActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectActivities
     * const projectActivity = await prisma.projectActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectActivityUpdateManyArgs>(args: SelectSubset<T, ProjectActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectActivities and returns the data updated in the database.
     * @param {ProjectActivityUpdateManyAndReturnArgs} args - Arguments to update many ProjectActivities.
     * @example
     * // Update many ProjectActivities
     * const projectActivity = await prisma.projectActivity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectActivities and only return the `id`
     * const projectActivityWithIdOnly = await prisma.projectActivity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectActivity.
     * @param {ProjectActivityUpsertArgs} args - Arguments to update or create a ProjectActivity.
     * @example
     * // Update or create a ProjectActivity
     * const projectActivity = await prisma.projectActivity.upsert({
     *   create: {
     *     // ... data to create a ProjectActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectActivity we want to update
     *   }
     * })
     */
    upsert<T extends ProjectActivityUpsertArgs>(args: SelectSubset<T, ProjectActivityUpsertArgs<ExtArgs>>): Prisma__ProjectActivityClient<$Result.GetResult<Prisma.$ProjectActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectActivityCountArgs} args - Arguments to filter ProjectActivities to count.
     * @example
     * // Count the number of ProjectActivities
     * const count = await prisma.projectActivity.count({
     *   where: {
     *     // ... the filter for the ProjectActivities we want to count
     *   }
     * })
    **/
    count<T extends ProjectActivityCountArgs>(
      args?: Subset<T, ProjectActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectActivityAggregateArgs>(args: Subset<T, ProjectActivityAggregateArgs>): Prisma.PrismaPromise<GetProjectActivityAggregateType<T>>

    /**
     * Group by ProjectActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectActivityGroupByArgs['orderBy'] }
        : { orderBy?: ProjectActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectActivity model
   */
  readonly fields: ProjectActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectActivity model
   */
  interface ProjectActivityFieldRefs {
    readonly id: FieldRef<"ProjectActivity", 'Int'>
    readonly projectId: FieldRef<"ProjectActivity", 'Int'>
    readonly type: FieldRef<"ProjectActivity", 'String'>
    readonly title: FieldRef<"ProjectActivity", 'String'>
    readonly description: FieldRef<"ProjectActivity", 'String'>
    readonly status: FieldRef<"ProjectActivity", 'String'>
    readonly icon: FieldRef<"ProjectActivity", 'String'>
    readonly actorName: FieldRef<"ProjectActivity", 'String'>
    readonly createdAt: FieldRef<"ProjectActivity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectActivity findUnique
   */
  export type ProjectActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    /**
     * Filter, which ProjectActivity to fetch.
     */
    where: ProjectActivityWhereUniqueInput
  }

  /**
   * ProjectActivity findUniqueOrThrow
   */
  export type ProjectActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    /**
     * Filter, which ProjectActivity to fetch.
     */
    where: ProjectActivityWhereUniqueInput
  }

  /**
   * ProjectActivity findFirst
   */
  export type ProjectActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    /**
     * Filter, which ProjectActivity to fetch.
     */
    where?: ProjectActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectActivities to fetch.
     */
    orderBy?: ProjectActivityOrderByWithRelationInput | ProjectActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectActivities.
     */
    cursor?: ProjectActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectActivities.
     */
    distinct?: ProjectActivityScalarFieldEnum | ProjectActivityScalarFieldEnum[]
  }

  /**
   * ProjectActivity findFirstOrThrow
   */
  export type ProjectActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    /**
     * Filter, which ProjectActivity to fetch.
     */
    where?: ProjectActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectActivities to fetch.
     */
    orderBy?: ProjectActivityOrderByWithRelationInput | ProjectActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectActivities.
     */
    cursor?: ProjectActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectActivities.
     */
    distinct?: ProjectActivityScalarFieldEnum | ProjectActivityScalarFieldEnum[]
  }

  /**
   * ProjectActivity findMany
   */
  export type ProjectActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    /**
     * Filter, which ProjectActivities to fetch.
     */
    where?: ProjectActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectActivities to fetch.
     */
    orderBy?: ProjectActivityOrderByWithRelationInput | ProjectActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectActivities.
     */
    cursor?: ProjectActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectActivities.
     */
    distinct?: ProjectActivityScalarFieldEnum | ProjectActivityScalarFieldEnum[]
  }

  /**
   * ProjectActivity create
   */
  export type ProjectActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectActivity.
     */
    data: XOR<ProjectActivityCreateInput, ProjectActivityUncheckedCreateInput>
  }

  /**
   * ProjectActivity createMany
   */
  export type ProjectActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectActivities.
     */
    data: ProjectActivityCreateManyInput | ProjectActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectActivity createManyAndReturn
   */
  export type ProjectActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectActivities.
     */
    data: ProjectActivityCreateManyInput | ProjectActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectActivity update
   */
  export type ProjectActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectActivity.
     */
    data: XOR<ProjectActivityUpdateInput, ProjectActivityUncheckedUpdateInput>
    /**
     * Choose, which ProjectActivity to update.
     */
    where: ProjectActivityWhereUniqueInput
  }

  /**
   * ProjectActivity updateMany
   */
  export type ProjectActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectActivities.
     */
    data: XOR<ProjectActivityUpdateManyMutationInput, ProjectActivityUncheckedUpdateManyInput>
    /**
     * Filter which ProjectActivities to update
     */
    where?: ProjectActivityWhereInput
    /**
     * Limit how many ProjectActivities to update.
     */
    limit?: number
  }

  /**
   * ProjectActivity updateManyAndReturn
   */
  export type ProjectActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * The data used to update ProjectActivities.
     */
    data: XOR<ProjectActivityUpdateManyMutationInput, ProjectActivityUncheckedUpdateManyInput>
    /**
     * Filter which ProjectActivities to update
     */
    where?: ProjectActivityWhereInput
    /**
     * Limit how many ProjectActivities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectActivity upsert
   */
  export type ProjectActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectActivity to update in case it exists.
     */
    where: ProjectActivityWhereUniqueInput
    /**
     * In case the ProjectActivity found by the `where` argument doesn't exist, create a new ProjectActivity with this data.
     */
    create: XOR<ProjectActivityCreateInput, ProjectActivityUncheckedCreateInput>
    /**
     * In case the ProjectActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectActivityUpdateInput, ProjectActivityUncheckedUpdateInput>
  }

  /**
   * ProjectActivity delete
   */
  export type ProjectActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
    /**
     * Filter which ProjectActivity to delete.
     */
    where: ProjectActivityWhereUniqueInput
  }

  /**
   * ProjectActivity deleteMany
   */
  export type ProjectActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectActivities to delete
     */
    where?: ProjectActivityWhereInput
    /**
     * Limit how many ProjectActivities to delete.
     */
    limit?: number
  }

  /**
   * ProjectActivity without action
   */
  export type ProjectActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectActivity
     */
    select?: ProjectActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectActivity
     */
    omit?: ProjectActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectActivityInclude<ExtArgs> | null
  }


  /**
   * Model ProgressReport
   */

  export type AggregateProgressReport = {
    _count: ProgressReportCountAggregateOutputType | null
    _avg: ProgressReportAvgAggregateOutputType | null
    _sum: ProgressReportSumAggregateOutputType | null
    _min: ProgressReportMinAggregateOutputType | null
    _max: ProgressReportMaxAggregateOutputType | null
  }

  export type ProgressReportAvgAggregateOutputType = {
    id: number | null
    projectId: number | null
  }

  export type ProgressReportSumAggregateOutputType = {
    id: number | null
    projectId: number | null
  }

  export type ProgressReportMinAggregateOutputType = {
    id: number | null
    projectId: number | null
    title: string | null
    description: string | null
    fileUrl: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgressReportMaxAggregateOutputType = {
    id: number | null
    projectId: number | null
    title: string | null
    description: string | null
    fileUrl: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgressReportCountAggregateOutputType = {
    id: number
    projectId: number
    title: number
    description: number
    fileUrl: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProgressReportAvgAggregateInputType = {
    id?: true
    projectId?: true
  }

  export type ProgressReportSumAggregateInputType = {
    id?: true
    projectId?: true
  }

  export type ProgressReportMinAggregateInputType = {
    id?: true
    projectId?: true
    title?: true
    description?: true
    fileUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgressReportMaxAggregateInputType = {
    id?: true
    projectId?: true
    title?: true
    description?: true
    fileUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgressReportCountAggregateInputType = {
    id?: true
    projectId?: true
    title?: true
    description?: true
    fileUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProgressReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgressReport to aggregate.
     */
    where?: ProgressReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgressReports to fetch.
     */
    orderBy?: ProgressReportOrderByWithRelationInput | ProgressReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgressReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgressReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgressReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProgressReports
    **/
    _count?: true | ProgressReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgressReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgressReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgressReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgressReportMaxAggregateInputType
  }

  export type GetProgressReportAggregateType<T extends ProgressReportAggregateArgs> = {
        [P in keyof T & keyof AggregateProgressReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgressReport[P]>
      : GetScalarType<T[P], AggregateProgressReport[P]>
  }




  export type ProgressReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgressReportWhereInput
    orderBy?: ProgressReportOrderByWithAggregationInput | ProgressReportOrderByWithAggregationInput[]
    by: ProgressReportScalarFieldEnum[] | ProgressReportScalarFieldEnum
    having?: ProgressReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgressReportCountAggregateInputType | true
    _avg?: ProgressReportAvgAggregateInputType
    _sum?: ProgressReportSumAggregateInputType
    _min?: ProgressReportMinAggregateInputType
    _max?: ProgressReportMaxAggregateInputType
  }

  export type ProgressReportGroupByOutputType = {
    id: number
    projectId: number
    title: string
    description: string | null
    fileUrl: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ProgressReportCountAggregateOutputType | null
    _avg: ProgressReportAvgAggregateOutputType | null
    _sum: ProgressReportSumAggregateOutputType | null
    _min: ProgressReportMinAggregateOutputType | null
    _max: ProgressReportMaxAggregateOutputType | null
  }

  type GetProgressReportGroupByPayload<T extends ProgressReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgressReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgressReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgressReportGroupByOutputType[P]>
            : GetScalarType<T[P], ProgressReportGroupByOutputType[P]>
        }
      >
    >


  export type ProgressReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    title?: boolean
    description?: boolean
    fileUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progressReport"]>

  export type ProgressReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    title?: boolean
    description?: boolean
    fileUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progressReport"]>

  export type ProgressReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    title?: boolean
    description?: boolean
    fileUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["progressReport"]>

  export type ProgressReportSelectScalar = {
    id?: boolean
    projectId?: boolean
    title?: boolean
    description?: boolean
    fileUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProgressReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "title" | "description" | "fileUrl" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["progressReport"]>
  export type ProgressReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProgressReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProgressReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProgressReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProgressReport"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: number
      title: string
      description: string | null
      fileUrl: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["progressReport"]>
    composites: {}
  }

  type ProgressReportGetPayload<S extends boolean | null | undefined | ProgressReportDefaultArgs> = $Result.GetResult<Prisma.$ProgressReportPayload, S>

  type ProgressReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgressReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgressReportCountAggregateInputType | true
    }

  export interface ProgressReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProgressReport'], meta: { name: 'ProgressReport' } }
    /**
     * Find zero or one ProgressReport that matches the filter.
     * @param {ProgressReportFindUniqueArgs} args - Arguments to find a ProgressReport
     * @example
     * // Get one ProgressReport
     * const progressReport = await prisma.progressReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgressReportFindUniqueArgs>(args: SelectSubset<T, ProgressReportFindUniqueArgs<ExtArgs>>): Prisma__ProgressReportClient<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProgressReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgressReportFindUniqueOrThrowArgs} args - Arguments to find a ProgressReport
     * @example
     * // Get one ProgressReport
     * const progressReport = await prisma.progressReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgressReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgressReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgressReportClient<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgressReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressReportFindFirstArgs} args - Arguments to find a ProgressReport
     * @example
     * // Get one ProgressReport
     * const progressReport = await prisma.progressReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgressReportFindFirstArgs>(args?: SelectSubset<T, ProgressReportFindFirstArgs<ExtArgs>>): Prisma__ProgressReportClient<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProgressReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressReportFindFirstOrThrowArgs} args - Arguments to find a ProgressReport
     * @example
     * // Get one ProgressReport
     * const progressReport = await prisma.progressReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgressReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgressReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgressReportClient<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProgressReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProgressReports
     * const progressReports = await prisma.progressReport.findMany()
     * 
     * // Get first 10 ProgressReports
     * const progressReports = await prisma.progressReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const progressReportWithIdOnly = await prisma.progressReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgressReportFindManyArgs>(args?: SelectSubset<T, ProgressReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProgressReport.
     * @param {ProgressReportCreateArgs} args - Arguments to create a ProgressReport.
     * @example
     * // Create one ProgressReport
     * const ProgressReport = await prisma.progressReport.create({
     *   data: {
     *     // ... data to create a ProgressReport
     *   }
     * })
     * 
     */
    create<T extends ProgressReportCreateArgs>(args: SelectSubset<T, ProgressReportCreateArgs<ExtArgs>>): Prisma__ProgressReportClient<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProgressReports.
     * @param {ProgressReportCreateManyArgs} args - Arguments to create many ProgressReports.
     * @example
     * // Create many ProgressReports
     * const progressReport = await prisma.progressReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgressReportCreateManyArgs>(args?: SelectSubset<T, ProgressReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProgressReports and returns the data saved in the database.
     * @param {ProgressReportCreateManyAndReturnArgs} args - Arguments to create many ProgressReports.
     * @example
     * // Create many ProgressReports
     * const progressReport = await prisma.progressReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProgressReports and only return the `id`
     * const progressReportWithIdOnly = await prisma.progressReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgressReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgressReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProgressReport.
     * @param {ProgressReportDeleteArgs} args - Arguments to delete one ProgressReport.
     * @example
     * // Delete one ProgressReport
     * const ProgressReport = await prisma.progressReport.delete({
     *   where: {
     *     // ... filter to delete one ProgressReport
     *   }
     * })
     * 
     */
    delete<T extends ProgressReportDeleteArgs>(args: SelectSubset<T, ProgressReportDeleteArgs<ExtArgs>>): Prisma__ProgressReportClient<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProgressReport.
     * @param {ProgressReportUpdateArgs} args - Arguments to update one ProgressReport.
     * @example
     * // Update one ProgressReport
     * const progressReport = await prisma.progressReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgressReportUpdateArgs>(args: SelectSubset<T, ProgressReportUpdateArgs<ExtArgs>>): Prisma__ProgressReportClient<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProgressReports.
     * @param {ProgressReportDeleteManyArgs} args - Arguments to filter ProgressReports to delete.
     * @example
     * // Delete a few ProgressReports
     * const { count } = await prisma.progressReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgressReportDeleteManyArgs>(args?: SelectSubset<T, ProgressReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgressReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProgressReports
     * const progressReport = await prisma.progressReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgressReportUpdateManyArgs>(args: SelectSubset<T, ProgressReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProgressReports and returns the data updated in the database.
     * @param {ProgressReportUpdateManyAndReturnArgs} args - Arguments to update many ProgressReports.
     * @example
     * // Update many ProgressReports
     * const progressReport = await prisma.progressReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProgressReports and only return the `id`
     * const progressReportWithIdOnly = await prisma.progressReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProgressReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgressReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProgressReport.
     * @param {ProgressReportUpsertArgs} args - Arguments to update or create a ProgressReport.
     * @example
     * // Update or create a ProgressReport
     * const progressReport = await prisma.progressReport.upsert({
     *   create: {
     *     // ... data to create a ProgressReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProgressReport we want to update
     *   }
     * })
     */
    upsert<T extends ProgressReportUpsertArgs>(args: SelectSubset<T, ProgressReportUpsertArgs<ExtArgs>>): Prisma__ProgressReportClient<$Result.GetResult<Prisma.$ProgressReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProgressReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressReportCountArgs} args - Arguments to filter ProgressReports to count.
     * @example
     * // Count the number of ProgressReports
     * const count = await prisma.progressReport.count({
     *   where: {
     *     // ... the filter for the ProgressReports we want to count
     *   }
     * })
    **/
    count<T extends ProgressReportCountArgs>(
      args?: Subset<T, ProgressReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgressReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProgressReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProgressReportAggregateArgs>(args: Subset<T, ProgressReportAggregateArgs>): Prisma.PrismaPromise<GetProgressReportAggregateType<T>>

    /**
     * Group by ProgressReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgressReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProgressReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgressReportGroupByArgs['orderBy'] }
        : { orderBy?: ProgressReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProgressReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgressReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProgressReport model
   */
  readonly fields: ProgressReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProgressReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgressReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProgressReport model
   */
  interface ProgressReportFieldRefs {
    readonly id: FieldRef<"ProgressReport", 'Int'>
    readonly projectId: FieldRef<"ProgressReport", 'Int'>
    readonly title: FieldRef<"ProgressReport", 'String'>
    readonly description: FieldRef<"ProgressReport", 'String'>
    readonly fileUrl: FieldRef<"ProgressReport", 'String'>
    readonly status: FieldRef<"ProgressReport", 'String'>
    readonly createdAt: FieldRef<"ProgressReport", 'DateTime'>
    readonly updatedAt: FieldRef<"ProgressReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProgressReport findUnique
   */
  export type ProgressReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    /**
     * Filter, which ProgressReport to fetch.
     */
    where: ProgressReportWhereUniqueInput
  }

  /**
   * ProgressReport findUniqueOrThrow
   */
  export type ProgressReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    /**
     * Filter, which ProgressReport to fetch.
     */
    where: ProgressReportWhereUniqueInput
  }

  /**
   * ProgressReport findFirst
   */
  export type ProgressReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    /**
     * Filter, which ProgressReport to fetch.
     */
    where?: ProgressReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgressReports to fetch.
     */
    orderBy?: ProgressReportOrderByWithRelationInput | ProgressReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgressReports.
     */
    cursor?: ProgressReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgressReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgressReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgressReports.
     */
    distinct?: ProgressReportScalarFieldEnum | ProgressReportScalarFieldEnum[]
  }

  /**
   * ProgressReport findFirstOrThrow
   */
  export type ProgressReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    /**
     * Filter, which ProgressReport to fetch.
     */
    where?: ProgressReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgressReports to fetch.
     */
    orderBy?: ProgressReportOrderByWithRelationInput | ProgressReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProgressReports.
     */
    cursor?: ProgressReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgressReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgressReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgressReports.
     */
    distinct?: ProgressReportScalarFieldEnum | ProgressReportScalarFieldEnum[]
  }

  /**
   * ProgressReport findMany
   */
  export type ProgressReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    /**
     * Filter, which ProgressReports to fetch.
     */
    where?: ProgressReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProgressReports to fetch.
     */
    orderBy?: ProgressReportOrderByWithRelationInput | ProgressReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProgressReports.
     */
    cursor?: ProgressReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProgressReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProgressReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProgressReports.
     */
    distinct?: ProgressReportScalarFieldEnum | ProgressReportScalarFieldEnum[]
  }

  /**
   * ProgressReport create
   */
  export type ProgressReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    /**
     * The data needed to create a ProgressReport.
     */
    data: XOR<ProgressReportCreateInput, ProgressReportUncheckedCreateInput>
  }

  /**
   * ProgressReport createMany
   */
  export type ProgressReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProgressReports.
     */
    data: ProgressReportCreateManyInput | ProgressReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProgressReport createManyAndReturn
   */
  export type ProgressReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * The data used to create many ProgressReports.
     */
    data: ProgressReportCreateManyInput | ProgressReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgressReport update
   */
  export type ProgressReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    /**
     * The data needed to update a ProgressReport.
     */
    data: XOR<ProgressReportUpdateInput, ProgressReportUncheckedUpdateInput>
    /**
     * Choose, which ProgressReport to update.
     */
    where: ProgressReportWhereUniqueInput
  }

  /**
   * ProgressReport updateMany
   */
  export type ProgressReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProgressReports.
     */
    data: XOR<ProgressReportUpdateManyMutationInput, ProgressReportUncheckedUpdateManyInput>
    /**
     * Filter which ProgressReports to update
     */
    where?: ProgressReportWhereInput
    /**
     * Limit how many ProgressReports to update.
     */
    limit?: number
  }

  /**
   * ProgressReport updateManyAndReturn
   */
  export type ProgressReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * The data used to update ProgressReports.
     */
    data: XOR<ProgressReportUpdateManyMutationInput, ProgressReportUncheckedUpdateManyInput>
    /**
     * Filter which ProgressReports to update
     */
    where?: ProgressReportWhereInput
    /**
     * Limit how many ProgressReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProgressReport upsert
   */
  export type ProgressReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    /**
     * The filter to search for the ProgressReport to update in case it exists.
     */
    where: ProgressReportWhereUniqueInput
    /**
     * In case the ProgressReport found by the `where` argument doesn't exist, create a new ProgressReport with this data.
     */
    create: XOR<ProgressReportCreateInput, ProgressReportUncheckedCreateInput>
    /**
     * In case the ProgressReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgressReportUpdateInput, ProgressReportUncheckedUpdateInput>
  }

  /**
   * ProgressReport delete
   */
  export type ProgressReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
    /**
     * Filter which ProgressReport to delete.
     */
    where: ProgressReportWhereUniqueInput
  }

  /**
   * ProgressReport deleteMany
   */
  export type ProgressReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProgressReports to delete
     */
    where?: ProgressReportWhereInput
    /**
     * Limit how many ProgressReports to delete.
     */
    limit?: number
  }

  /**
   * ProgressReport without action
   */
  export type ProgressReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgressReport
     */
    select?: ProgressReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProgressReport
     */
    omit?: ProgressReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgressReportInclude<ExtArgs> | null
  }


  /**
   * Model ExamSchedule
   */

  export type AggregateExamSchedule = {
    _count: ExamScheduleCountAggregateOutputType | null
    _avg: ExamScheduleAvgAggregateOutputType | null
    _sum: ExamScheduleSumAggregateOutputType | null
    _min: ExamScheduleMinAggregateOutputType | null
    _max: ExamScheduleMaxAggregateOutputType | null
  }

  export type ExamScheduleAvgAggregateOutputType = {
    id: number | null
    projectId: number | null
  }

  export type ExamScheduleSumAggregateOutputType = {
    id: number | null
    projectId: number | null
  }

  export type ExamScheduleMinAggregateOutputType = {
    id: number | null
    projectId: number | null
    type: string | null
    examDate: Date | null
    startTime: string | null
    endTime: string | null
    location: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExamScheduleMaxAggregateOutputType = {
    id: number | null
    projectId: number | null
    type: string | null
    examDate: Date | null
    startTime: string | null
    endTime: string | null
    location: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExamScheduleCountAggregateOutputType = {
    id: number
    projectId: number
    type: number
    examDate: number
    startTime: number
    endTime: number
    location: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExamScheduleAvgAggregateInputType = {
    id?: true
    projectId?: true
  }

  export type ExamScheduleSumAggregateInputType = {
    id?: true
    projectId?: true
  }

  export type ExamScheduleMinAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    examDate?: true
    startTime?: true
    endTime?: true
    location?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExamScheduleMaxAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    examDate?: true
    startTime?: true
    endTime?: true
    location?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExamScheduleCountAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    examDate?: true
    startTime?: true
    endTime?: true
    location?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExamScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamSchedule to aggregate.
     */
    where?: ExamScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamSchedules to fetch.
     */
    orderBy?: ExamScheduleOrderByWithRelationInput | ExamScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExamScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExamSchedules
    **/
    _count?: true | ExamScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExamScheduleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExamScheduleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExamScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExamScheduleMaxAggregateInputType
  }

  export type GetExamScheduleAggregateType<T extends ExamScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateExamSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExamSchedule[P]>
      : GetScalarType<T[P], AggregateExamSchedule[P]>
  }




  export type ExamScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExamScheduleWhereInput
    orderBy?: ExamScheduleOrderByWithAggregationInput | ExamScheduleOrderByWithAggregationInput[]
    by: ExamScheduleScalarFieldEnum[] | ExamScheduleScalarFieldEnum
    having?: ExamScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExamScheduleCountAggregateInputType | true
    _avg?: ExamScheduleAvgAggregateInputType
    _sum?: ExamScheduleSumAggregateInputType
    _min?: ExamScheduleMinAggregateInputType
    _max?: ExamScheduleMaxAggregateInputType
  }

  export type ExamScheduleGroupByOutputType = {
    id: number
    projectId: number
    type: string
    examDate: Date | null
    startTime: string | null
    endTime: string | null
    location: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ExamScheduleCountAggregateOutputType | null
    _avg: ExamScheduleAvgAggregateOutputType | null
    _sum: ExamScheduleSumAggregateOutputType | null
    _min: ExamScheduleMinAggregateOutputType | null
    _max: ExamScheduleMaxAggregateOutputType | null
  }

  type GetExamScheduleGroupByPayload<T extends ExamScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExamScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExamScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExamScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ExamScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ExamScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    examDate?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examSchedule"]>

  export type ExamScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    examDate?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examSchedule"]>

  export type ExamScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    examDate?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["examSchedule"]>

  export type ExamScheduleSelectScalar = {
    id?: boolean
    projectId?: boolean
    type?: boolean
    examDate?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExamScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "type" | "examDate" | "startTime" | "endTime" | "location" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["examSchedule"]>
  export type ExamScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ExamScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ExamScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ExamSchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExamSchedule"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      projectId: number
      type: string
      examDate: Date | null
      startTime: string | null
      endTime: string | null
      location: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["examSchedule"]>
    composites: {}
  }

  type ExamScheduleGetPayload<S extends boolean | null | undefined | ExamScheduleDefaultArgs> = $Result.GetResult<Prisma.$ExamSchedulePayload, S>

  type ExamScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExamScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExamScheduleCountAggregateInputType | true
    }

  export interface ExamScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExamSchedule'], meta: { name: 'ExamSchedule' } }
    /**
     * Find zero or one ExamSchedule that matches the filter.
     * @param {ExamScheduleFindUniqueArgs} args - Arguments to find a ExamSchedule
     * @example
     * // Get one ExamSchedule
     * const examSchedule = await prisma.examSchedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExamScheduleFindUniqueArgs>(args: SelectSubset<T, ExamScheduleFindUniqueArgs<ExtArgs>>): Prisma__ExamScheduleClient<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExamSchedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExamScheduleFindUniqueOrThrowArgs} args - Arguments to find a ExamSchedule
     * @example
     * // Get one ExamSchedule
     * const examSchedule = await prisma.examSchedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExamScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ExamScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExamScheduleClient<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExamSchedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamScheduleFindFirstArgs} args - Arguments to find a ExamSchedule
     * @example
     * // Get one ExamSchedule
     * const examSchedule = await prisma.examSchedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExamScheduleFindFirstArgs>(args?: SelectSubset<T, ExamScheduleFindFirstArgs<ExtArgs>>): Prisma__ExamScheduleClient<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExamSchedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamScheduleFindFirstOrThrowArgs} args - Arguments to find a ExamSchedule
     * @example
     * // Get one ExamSchedule
     * const examSchedule = await prisma.examSchedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExamScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ExamScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExamScheduleClient<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExamSchedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExamSchedules
     * const examSchedules = await prisma.examSchedule.findMany()
     * 
     * // Get first 10 ExamSchedules
     * const examSchedules = await prisma.examSchedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const examScheduleWithIdOnly = await prisma.examSchedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExamScheduleFindManyArgs>(args?: SelectSubset<T, ExamScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExamSchedule.
     * @param {ExamScheduleCreateArgs} args - Arguments to create a ExamSchedule.
     * @example
     * // Create one ExamSchedule
     * const ExamSchedule = await prisma.examSchedule.create({
     *   data: {
     *     // ... data to create a ExamSchedule
     *   }
     * })
     * 
     */
    create<T extends ExamScheduleCreateArgs>(args: SelectSubset<T, ExamScheduleCreateArgs<ExtArgs>>): Prisma__ExamScheduleClient<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExamSchedules.
     * @param {ExamScheduleCreateManyArgs} args - Arguments to create many ExamSchedules.
     * @example
     * // Create many ExamSchedules
     * const examSchedule = await prisma.examSchedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExamScheduleCreateManyArgs>(args?: SelectSubset<T, ExamScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExamSchedules and returns the data saved in the database.
     * @param {ExamScheduleCreateManyAndReturnArgs} args - Arguments to create many ExamSchedules.
     * @example
     * // Create many ExamSchedules
     * const examSchedule = await prisma.examSchedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExamSchedules and only return the `id`
     * const examScheduleWithIdOnly = await prisma.examSchedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExamScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, ExamScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExamSchedule.
     * @param {ExamScheduleDeleteArgs} args - Arguments to delete one ExamSchedule.
     * @example
     * // Delete one ExamSchedule
     * const ExamSchedule = await prisma.examSchedule.delete({
     *   where: {
     *     // ... filter to delete one ExamSchedule
     *   }
     * })
     * 
     */
    delete<T extends ExamScheduleDeleteArgs>(args: SelectSubset<T, ExamScheduleDeleteArgs<ExtArgs>>): Prisma__ExamScheduleClient<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExamSchedule.
     * @param {ExamScheduleUpdateArgs} args - Arguments to update one ExamSchedule.
     * @example
     * // Update one ExamSchedule
     * const examSchedule = await prisma.examSchedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExamScheduleUpdateArgs>(args: SelectSubset<T, ExamScheduleUpdateArgs<ExtArgs>>): Prisma__ExamScheduleClient<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExamSchedules.
     * @param {ExamScheduleDeleteManyArgs} args - Arguments to filter ExamSchedules to delete.
     * @example
     * // Delete a few ExamSchedules
     * const { count } = await prisma.examSchedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExamScheduleDeleteManyArgs>(args?: SelectSubset<T, ExamScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExamSchedules
     * const examSchedule = await prisma.examSchedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExamScheduleUpdateManyArgs>(args: SelectSubset<T, ExamScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExamSchedules and returns the data updated in the database.
     * @param {ExamScheduleUpdateManyAndReturnArgs} args - Arguments to update many ExamSchedules.
     * @example
     * // Update many ExamSchedules
     * const examSchedule = await prisma.examSchedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExamSchedules and only return the `id`
     * const examScheduleWithIdOnly = await prisma.examSchedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExamScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, ExamScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExamSchedule.
     * @param {ExamScheduleUpsertArgs} args - Arguments to update or create a ExamSchedule.
     * @example
     * // Update or create a ExamSchedule
     * const examSchedule = await prisma.examSchedule.upsert({
     *   create: {
     *     // ... data to create a ExamSchedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExamSchedule we want to update
     *   }
     * })
     */
    upsert<T extends ExamScheduleUpsertArgs>(args: SelectSubset<T, ExamScheduleUpsertArgs<ExtArgs>>): Prisma__ExamScheduleClient<$Result.GetResult<Prisma.$ExamSchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExamSchedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamScheduleCountArgs} args - Arguments to filter ExamSchedules to count.
     * @example
     * // Count the number of ExamSchedules
     * const count = await prisma.examSchedule.count({
     *   where: {
     *     // ... the filter for the ExamSchedules we want to count
     *   }
     * })
    **/
    count<T extends ExamScheduleCountArgs>(
      args?: Subset<T, ExamScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExamScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExamSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExamScheduleAggregateArgs>(args: Subset<T, ExamScheduleAggregateArgs>): Prisma.PrismaPromise<GetExamScheduleAggregateType<T>>

    /**
     * Group by ExamSchedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExamScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExamScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExamScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ExamScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExamScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExamScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExamSchedule model
   */
  readonly fields: ExamScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExamSchedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExamScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExamSchedule model
   */
  interface ExamScheduleFieldRefs {
    readonly id: FieldRef<"ExamSchedule", 'Int'>
    readonly projectId: FieldRef<"ExamSchedule", 'Int'>
    readonly type: FieldRef<"ExamSchedule", 'String'>
    readonly examDate: FieldRef<"ExamSchedule", 'DateTime'>
    readonly startTime: FieldRef<"ExamSchedule", 'String'>
    readonly endTime: FieldRef<"ExamSchedule", 'String'>
    readonly location: FieldRef<"ExamSchedule", 'String'>
    readonly status: FieldRef<"ExamSchedule", 'String'>
    readonly createdAt: FieldRef<"ExamSchedule", 'DateTime'>
    readonly updatedAt: FieldRef<"ExamSchedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExamSchedule findUnique
   */
  export type ExamScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ExamSchedule to fetch.
     */
    where: ExamScheduleWhereUniqueInput
  }

  /**
   * ExamSchedule findUniqueOrThrow
   */
  export type ExamScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ExamSchedule to fetch.
     */
    where: ExamScheduleWhereUniqueInput
  }

  /**
   * ExamSchedule findFirst
   */
  export type ExamScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ExamSchedule to fetch.
     */
    where?: ExamScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamSchedules to fetch.
     */
    orderBy?: ExamScheduleOrderByWithRelationInput | ExamScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamSchedules.
     */
    cursor?: ExamScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamSchedules.
     */
    distinct?: ExamScheduleScalarFieldEnum | ExamScheduleScalarFieldEnum[]
  }

  /**
   * ExamSchedule findFirstOrThrow
   */
  export type ExamScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ExamSchedule to fetch.
     */
    where?: ExamScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamSchedules to fetch.
     */
    orderBy?: ExamScheduleOrderByWithRelationInput | ExamScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExamSchedules.
     */
    cursor?: ExamScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamSchedules.
     */
    distinct?: ExamScheduleScalarFieldEnum | ExamScheduleScalarFieldEnum[]
  }

  /**
   * ExamSchedule findMany
   */
  export type ExamScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    /**
     * Filter, which ExamSchedules to fetch.
     */
    where?: ExamScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExamSchedules to fetch.
     */
    orderBy?: ExamScheduleOrderByWithRelationInput | ExamScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExamSchedules.
     */
    cursor?: ExamScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExamSchedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExamSchedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExamSchedules.
     */
    distinct?: ExamScheduleScalarFieldEnum | ExamScheduleScalarFieldEnum[]
  }

  /**
   * ExamSchedule create
   */
  export type ExamScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a ExamSchedule.
     */
    data: XOR<ExamScheduleCreateInput, ExamScheduleUncheckedCreateInput>
  }

  /**
   * ExamSchedule createMany
   */
  export type ExamScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExamSchedules.
     */
    data: ExamScheduleCreateManyInput | ExamScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExamSchedule createManyAndReturn
   */
  export type ExamScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many ExamSchedules.
     */
    data: ExamScheduleCreateManyInput | ExamScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExamSchedule update
   */
  export type ExamScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a ExamSchedule.
     */
    data: XOR<ExamScheduleUpdateInput, ExamScheduleUncheckedUpdateInput>
    /**
     * Choose, which ExamSchedule to update.
     */
    where: ExamScheduleWhereUniqueInput
  }

  /**
   * ExamSchedule updateMany
   */
  export type ExamScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExamSchedules.
     */
    data: XOR<ExamScheduleUpdateManyMutationInput, ExamScheduleUncheckedUpdateManyInput>
    /**
     * Filter which ExamSchedules to update
     */
    where?: ExamScheduleWhereInput
    /**
     * Limit how many ExamSchedules to update.
     */
    limit?: number
  }

  /**
   * ExamSchedule updateManyAndReturn
   */
  export type ExamScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * The data used to update ExamSchedules.
     */
    data: XOR<ExamScheduleUpdateManyMutationInput, ExamScheduleUncheckedUpdateManyInput>
    /**
     * Filter which ExamSchedules to update
     */
    where?: ExamScheduleWhereInput
    /**
     * Limit how many ExamSchedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExamSchedule upsert
   */
  export type ExamScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the ExamSchedule to update in case it exists.
     */
    where: ExamScheduleWhereUniqueInput
    /**
     * In case the ExamSchedule found by the `where` argument doesn't exist, create a new ExamSchedule with this data.
     */
    create: XOR<ExamScheduleCreateInput, ExamScheduleUncheckedCreateInput>
    /**
     * In case the ExamSchedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExamScheduleUpdateInput, ExamScheduleUncheckedUpdateInput>
  }

  /**
   * ExamSchedule delete
   */
  export type ExamScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
    /**
     * Filter which ExamSchedule to delete.
     */
    where: ExamScheduleWhereUniqueInput
  }

  /**
   * ExamSchedule deleteMany
   */
  export type ExamScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExamSchedules to delete
     */
    where?: ExamScheduleWhereInput
    /**
     * Limit how many ExamSchedules to delete.
     */
    limit?: number
  }

  /**
   * ExamSchedule without action
   */
  export type ExamScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExamSchedule
     */
    select?: ExamScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExamSchedule
     */
    omit?: ExamScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExamScheduleInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    fullname: 'fullname',
    academicYear: 'academicYear',
    tel: 'tel',
    lineId: 'lineId',
    profileImage: 'profileImage',
    role: 'role',
    isApproved: 'isApproved',
    addressNo: 'addressNo',
    moo: 'moo',
    soi: 'soi',
    road: 'road',
    subdistrict: 'subdistrict',
    district: 'district',
    province: 'province',
    zipcode: 'zipcode',
    homePhone: 'homePhone',
    emergencyContact: 'emergencyContact',
    position: 'position',
    department: 'department',
    expertise: 'expertise',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    fullname: 'fullname',
    email: 'email',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    titleTh: 'titleTh',
    titleEn: 'titleEn',
    semester: 'semester',
    academicYear: 'academicYear',
    step: 'step',
    status: 'status',
    feedback: 'feedback',
    thesisUrl: 'thesisUrl',
    programUrl: 'programUrl',
    manualUrl: 'manualUrl',
    student1Id: 'student1Id',
    student2Id: 'student2Id',
    advisorId: 'advisorId',
    coAdvisorId: 'coAdvisorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectStepStatusScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    step: 'step',
    status: 'status',
    feedback: 'feedback',
    approvedById: 'approvedById',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type ProjectStepStatusScalarFieldEnum = (typeof ProjectStepStatusScalarFieldEnum)[keyof typeof ProjectStepStatusScalarFieldEnum]


  export const ProjectActivityScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    type: 'type',
    title: 'title',
    description: 'description',
    status: 'status',
    icon: 'icon',
    actorName: 'actorName',
    createdAt: 'createdAt'
  };

  export type ProjectActivityScalarFieldEnum = (typeof ProjectActivityScalarFieldEnum)[keyof typeof ProjectActivityScalarFieldEnum]


  export const ProgressReportScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    title: 'title',
    description: 'description',
    fileUrl: 'fileUrl',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProgressReportScalarFieldEnum = (typeof ProgressReportScalarFieldEnum)[keyof typeof ProgressReportScalarFieldEnum]


  export const ExamScheduleScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    type: 'type',
    examDate: 'examDate',
    startTime: 'startTime',
    endTime: 'endTime',
    location: 'location',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExamScheduleScalarFieldEnum = (typeof ExamScheduleScalarFieldEnum)[keyof typeof ExamScheduleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    fullname?: StringNullableFilter<"User"> | string | null
    academicYear?: StringNullableFilter<"User"> | string | null
    tel?: StringNullableFilter<"User"> | string | null
    lineId?: StringNullableFilter<"User"> | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isApproved?: BoolFilter<"User"> | boolean
    addressNo?: StringNullableFilter<"User"> | string | null
    moo?: StringNullableFilter<"User"> | string | null
    soi?: StringNullableFilter<"User"> | string | null
    road?: StringNullableFilter<"User"> | string | null
    subdistrict?: StringNullableFilter<"User"> | string | null
    district?: StringNullableFilter<"User"> | string | null
    province?: StringNullableFilter<"User"> | string | null
    zipcode?: StringNullableFilter<"User"> | string | null
    homePhone?: StringNullableFilter<"User"> | string | null
    emergencyContact?: StringNullableFilter<"User"> | string | null
    position?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    expertise?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects1?: ProjectListRelationFilter
    projects2?: ProjectListRelationFilter
    advisedProjects?: ProjectListRelationFilter
    coAdvisedProjects?: ProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullname?: SortOrderInput | SortOrder
    academicYear?: SortOrderInput | SortOrder
    tel?: SortOrderInput | SortOrder
    lineId?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    role?: SortOrder
    isApproved?: SortOrder
    addressNo?: SortOrderInput | SortOrder
    moo?: SortOrderInput | SortOrder
    soi?: SortOrderInput | SortOrder
    road?: SortOrderInput | SortOrder
    subdistrict?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    zipcode?: SortOrderInput | SortOrder
    homePhone?: SortOrderInput | SortOrder
    emergencyContact?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    expertise?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projects1?: ProjectOrderByRelationAggregateInput
    projects2?: ProjectOrderByRelationAggregateInput
    advisedProjects?: ProjectOrderByRelationAggregateInput
    coAdvisedProjects?: ProjectOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    fullname?: StringNullableFilter<"User"> | string | null
    academicYear?: StringNullableFilter<"User"> | string | null
    tel?: StringNullableFilter<"User"> | string | null
    lineId?: StringNullableFilter<"User"> | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    isApproved?: BoolFilter<"User"> | boolean
    addressNo?: StringNullableFilter<"User"> | string | null
    moo?: StringNullableFilter<"User"> | string | null
    soi?: StringNullableFilter<"User"> | string | null
    road?: StringNullableFilter<"User"> | string | null
    subdistrict?: StringNullableFilter<"User"> | string | null
    district?: StringNullableFilter<"User"> | string | null
    province?: StringNullableFilter<"User"> | string | null
    zipcode?: StringNullableFilter<"User"> | string | null
    homePhone?: StringNullableFilter<"User"> | string | null
    emergencyContact?: StringNullableFilter<"User"> | string | null
    position?: StringNullableFilter<"User"> | string | null
    department?: StringNullableFilter<"User"> | string | null
    expertise?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    projects1?: ProjectListRelationFilter
    projects2?: ProjectListRelationFilter
    advisedProjects?: ProjectListRelationFilter
    coAdvisedProjects?: ProjectListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullname?: SortOrderInput | SortOrder
    academicYear?: SortOrderInput | SortOrder
    tel?: SortOrderInput | SortOrder
    lineId?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    role?: SortOrder
    isApproved?: SortOrder
    addressNo?: SortOrderInput | SortOrder
    moo?: SortOrderInput | SortOrder
    soi?: SortOrderInput | SortOrder
    road?: SortOrderInput | SortOrder
    subdistrict?: SortOrderInput | SortOrder
    district?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    zipcode?: SortOrderInput | SortOrder
    homePhone?: SortOrderInput | SortOrder
    emergencyContact?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    expertise?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    fullname?: StringNullableWithAggregatesFilter<"User"> | string | null
    academicYear?: StringNullableWithAggregatesFilter<"User"> | string | null
    tel?: StringNullableWithAggregatesFilter<"User"> | string | null
    lineId?: StringNullableWithAggregatesFilter<"User"> | string | null
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    isApproved?: BoolWithAggregatesFilter<"User"> | boolean
    addressNo?: StringNullableWithAggregatesFilter<"User"> | string | null
    moo?: StringNullableWithAggregatesFilter<"User"> | string | null
    soi?: StringNullableWithAggregatesFilter<"User"> | string | null
    road?: StringNullableWithAggregatesFilter<"User"> | string | null
    subdistrict?: StringNullableWithAggregatesFilter<"User"> | string | null
    district?: StringNullableWithAggregatesFilter<"User"> | string | null
    province?: StringNullableWithAggregatesFilter<"User"> | string | null
    zipcode?: StringNullableWithAggregatesFilter<"User"> | string | null
    homePhone?: StringNullableWithAggregatesFilter<"User"> | string | null
    emergencyContact?: StringNullableWithAggregatesFilter<"User"> | string | null
    position?: StringNullableWithAggregatesFilter<"User"> | string | null
    department?: StringNullableWithAggregatesFilter<"User"> | string | null
    expertise?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: IntFilter<"Admin"> | number
    username?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    fullname?: StringNullableFilter<"Admin"> | string | null
    email?: StringFilter<"Admin"> | string
    role?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    approvedSteps?: ProjectStepStatusListRelationFilter
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrderInput | SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    approvedSteps?: ProjectStepStatusOrderByRelationAggregateInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    password?: StringFilter<"Admin"> | string
    fullname?: StringNullableFilter<"Admin"> | string | null
    role?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    approvedSteps?: ProjectStepStatusListRelationFilter
  }, "id" | "username" | "email">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrderInput | SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Admin"> | number
    username?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    fullname?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    email?: StringWithAggregatesFilter<"Admin"> | string
    role?: StringWithAggregatesFilter<"Admin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: IntFilter<"Project"> | number
    titleTh?: StringFilter<"Project"> | string
    titleEn?: StringNullableFilter<"Project"> | string | null
    semester?: StringNullableFilter<"Project"> | string | null
    academicYear?: StringNullableFilter<"Project"> | string | null
    step?: IntFilter<"Project"> | number
    status?: StringFilter<"Project"> | string
    feedback?: StringNullableFilter<"Project"> | string | null
    thesisUrl?: StringNullableFilter<"Project"> | string | null
    programUrl?: StringNullableFilter<"Project"> | string | null
    manualUrl?: StringNullableFilter<"Project"> | string | null
    student1Id?: IntFilter<"Project"> | number
    student2Id?: IntNullableFilter<"Project"> | number | null
    advisorId?: IntNullableFilter<"Project"> | number | null
    coAdvisorId?: IntNullableFilter<"Project"> | number | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    student1?: XOR<UserScalarRelationFilter, UserWhereInput>
    student2?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    advisor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    coAdvisor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    reports?: ProgressReportListRelationFilter
    exams?: ExamScheduleListRelationFilter
    activities?: ProjectActivityListRelationFilter
    stepStatuses?: ProjectStepStatusListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    titleTh?: SortOrder
    titleEn?: SortOrderInput | SortOrder
    semester?: SortOrderInput | SortOrder
    academicYear?: SortOrderInput | SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrderInput | SortOrder
    thesisUrl?: SortOrderInput | SortOrder
    programUrl?: SortOrderInput | SortOrder
    manualUrl?: SortOrderInput | SortOrder
    student1Id?: SortOrder
    student2Id?: SortOrderInput | SortOrder
    advisorId?: SortOrderInput | SortOrder
    coAdvisorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student1?: UserOrderByWithRelationInput
    student2?: UserOrderByWithRelationInput
    advisor?: UserOrderByWithRelationInput
    coAdvisor?: UserOrderByWithRelationInput
    reports?: ProgressReportOrderByRelationAggregateInput
    exams?: ExamScheduleOrderByRelationAggregateInput
    activities?: ProjectActivityOrderByRelationAggregateInput
    stepStatuses?: ProjectStepStatusOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    titleTh?: StringFilter<"Project"> | string
    titleEn?: StringNullableFilter<"Project"> | string | null
    semester?: StringNullableFilter<"Project"> | string | null
    academicYear?: StringNullableFilter<"Project"> | string | null
    step?: IntFilter<"Project"> | number
    status?: StringFilter<"Project"> | string
    feedback?: StringNullableFilter<"Project"> | string | null
    thesisUrl?: StringNullableFilter<"Project"> | string | null
    programUrl?: StringNullableFilter<"Project"> | string | null
    manualUrl?: StringNullableFilter<"Project"> | string | null
    student1Id?: IntFilter<"Project"> | number
    student2Id?: IntNullableFilter<"Project"> | number | null
    advisorId?: IntNullableFilter<"Project"> | number | null
    coAdvisorId?: IntNullableFilter<"Project"> | number | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    student1?: XOR<UserScalarRelationFilter, UserWhereInput>
    student2?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    advisor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    coAdvisor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    reports?: ProgressReportListRelationFilter
    exams?: ExamScheduleListRelationFilter
    activities?: ProjectActivityListRelationFilter
    stepStatuses?: ProjectStepStatusListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    titleTh?: SortOrder
    titleEn?: SortOrderInput | SortOrder
    semester?: SortOrderInput | SortOrder
    academicYear?: SortOrderInput | SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrderInput | SortOrder
    thesisUrl?: SortOrderInput | SortOrder
    programUrl?: SortOrderInput | SortOrder
    manualUrl?: SortOrderInput | SortOrder
    student1Id?: SortOrder
    student2Id?: SortOrderInput | SortOrder
    advisorId?: SortOrderInput | SortOrder
    coAdvisorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Project"> | number
    titleTh?: StringWithAggregatesFilter<"Project"> | string
    titleEn?: StringNullableWithAggregatesFilter<"Project"> | string | null
    semester?: StringNullableWithAggregatesFilter<"Project"> | string | null
    academicYear?: StringNullableWithAggregatesFilter<"Project"> | string | null
    step?: IntWithAggregatesFilter<"Project"> | number
    status?: StringWithAggregatesFilter<"Project"> | string
    feedback?: StringNullableWithAggregatesFilter<"Project"> | string | null
    thesisUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    programUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    manualUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    student1Id?: IntWithAggregatesFilter<"Project"> | number
    student2Id?: IntNullableWithAggregatesFilter<"Project"> | number | null
    advisorId?: IntNullableWithAggregatesFilter<"Project"> | number | null
    coAdvisorId?: IntNullableWithAggregatesFilter<"Project"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProjectStepStatusWhereInput = {
    AND?: ProjectStepStatusWhereInput | ProjectStepStatusWhereInput[]
    OR?: ProjectStepStatusWhereInput[]
    NOT?: ProjectStepStatusWhereInput | ProjectStepStatusWhereInput[]
    id?: IntFilter<"ProjectStepStatus"> | number
    projectId?: IntFilter<"ProjectStepStatus"> | number
    step?: IntFilter<"ProjectStepStatus"> | number
    status?: StringFilter<"ProjectStepStatus"> | string
    feedback?: StringNullableFilter<"ProjectStepStatus"> | string | null
    approvedById?: IntNullableFilter<"ProjectStepStatus"> | number | null
    updatedAt?: DateTimeFilter<"ProjectStepStatus"> | Date | string
    createdAt?: DateTimeFilter<"ProjectStepStatus"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    approvedBy?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
  }

  export type ProjectStepStatusOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    approvedBy?: AdminOrderByWithRelationInput
  }

  export type ProjectStepStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    projectId_step?: ProjectStepStatusProjectIdStepCompoundUniqueInput
    AND?: ProjectStepStatusWhereInput | ProjectStepStatusWhereInput[]
    OR?: ProjectStepStatusWhereInput[]
    NOT?: ProjectStepStatusWhereInput | ProjectStepStatusWhereInput[]
    projectId?: IntFilter<"ProjectStepStatus"> | number
    step?: IntFilter<"ProjectStepStatus"> | number
    status?: StringFilter<"ProjectStepStatus"> | string
    feedback?: StringNullableFilter<"ProjectStepStatus"> | string | null
    approvedById?: IntNullableFilter<"ProjectStepStatus"> | number | null
    updatedAt?: DateTimeFilter<"ProjectStepStatus"> | Date | string
    createdAt?: DateTimeFilter<"ProjectStepStatus"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    approvedBy?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
  }, "id" | "projectId_step">

  export type ProjectStepStatusOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: ProjectStepStatusCountOrderByAggregateInput
    _avg?: ProjectStepStatusAvgOrderByAggregateInput
    _max?: ProjectStepStatusMaxOrderByAggregateInput
    _min?: ProjectStepStatusMinOrderByAggregateInput
    _sum?: ProjectStepStatusSumOrderByAggregateInput
  }

  export type ProjectStepStatusScalarWhereWithAggregatesInput = {
    AND?: ProjectStepStatusScalarWhereWithAggregatesInput | ProjectStepStatusScalarWhereWithAggregatesInput[]
    OR?: ProjectStepStatusScalarWhereWithAggregatesInput[]
    NOT?: ProjectStepStatusScalarWhereWithAggregatesInput | ProjectStepStatusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProjectStepStatus"> | number
    projectId?: IntWithAggregatesFilter<"ProjectStepStatus"> | number
    step?: IntWithAggregatesFilter<"ProjectStepStatus"> | number
    status?: StringWithAggregatesFilter<"ProjectStepStatus"> | string
    feedback?: StringNullableWithAggregatesFilter<"ProjectStepStatus"> | string | null
    approvedById?: IntNullableWithAggregatesFilter<"ProjectStepStatus"> | number | null
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectStepStatus"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ProjectStepStatus"> | Date | string
  }

  export type ProjectActivityWhereInput = {
    AND?: ProjectActivityWhereInput | ProjectActivityWhereInput[]
    OR?: ProjectActivityWhereInput[]
    NOT?: ProjectActivityWhereInput | ProjectActivityWhereInput[]
    id?: IntFilter<"ProjectActivity"> | number
    projectId?: IntFilter<"ProjectActivity"> | number
    type?: StringFilter<"ProjectActivity"> | string
    title?: StringFilter<"ProjectActivity"> | string
    description?: StringNullableFilter<"ProjectActivity"> | string | null
    status?: StringNullableFilter<"ProjectActivity"> | string | null
    icon?: StringNullableFilter<"ProjectActivity"> | string | null
    actorName?: StringNullableFilter<"ProjectActivity"> | string | null
    createdAt?: DateTimeFilter<"ProjectActivity"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectActivityOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    actorName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProjectActivityWhereInput | ProjectActivityWhereInput[]
    OR?: ProjectActivityWhereInput[]
    NOT?: ProjectActivityWhereInput | ProjectActivityWhereInput[]
    projectId?: IntFilter<"ProjectActivity"> | number
    type?: StringFilter<"ProjectActivity"> | string
    title?: StringFilter<"ProjectActivity"> | string
    description?: StringNullableFilter<"ProjectActivity"> | string | null
    status?: StringNullableFilter<"ProjectActivity"> | string | null
    icon?: StringNullableFilter<"ProjectActivity"> | string | null
    actorName?: StringNullableFilter<"ProjectActivity"> | string | null
    createdAt?: DateTimeFilter<"ProjectActivity"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ProjectActivityOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    actorName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProjectActivityCountOrderByAggregateInput
    _avg?: ProjectActivityAvgOrderByAggregateInput
    _max?: ProjectActivityMaxOrderByAggregateInput
    _min?: ProjectActivityMinOrderByAggregateInput
    _sum?: ProjectActivitySumOrderByAggregateInput
  }

  export type ProjectActivityScalarWhereWithAggregatesInput = {
    AND?: ProjectActivityScalarWhereWithAggregatesInput | ProjectActivityScalarWhereWithAggregatesInput[]
    OR?: ProjectActivityScalarWhereWithAggregatesInput[]
    NOT?: ProjectActivityScalarWhereWithAggregatesInput | ProjectActivityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProjectActivity"> | number
    projectId?: IntWithAggregatesFilter<"ProjectActivity"> | number
    type?: StringWithAggregatesFilter<"ProjectActivity"> | string
    title?: StringWithAggregatesFilter<"ProjectActivity"> | string
    description?: StringNullableWithAggregatesFilter<"ProjectActivity"> | string | null
    status?: StringNullableWithAggregatesFilter<"ProjectActivity"> | string | null
    icon?: StringNullableWithAggregatesFilter<"ProjectActivity"> | string | null
    actorName?: StringNullableWithAggregatesFilter<"ProjectActivity"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProjectActivity"> | Date | string
  }

  export type ProgressReportWhereInput = {
    AND?: ProgressReportWhereInput | ProgressReportWhereInput[]
    OR?: ProgressReportWhereInput[]
    NOT?: ProgressReportWhereInput | ProgressReportWhereInput[]
    id?: IntFilter<"ProgressReport"> | number
    projectId?: IntFilter<"ProgressReport"> | number
    title?: StringFilter<"ProgressReport"> | string
    description?: StringNullableFilter<"ProgressReport"> | string | null
    fileUrl?: StringNullableFilter<"ProgressReport"> | string | null
    status?: StringFilter<"ProgressReport"> | string
    createdAt?: DateTimeFilter<"ProgressReport"> | Date | string
    updatedAt?: DateTimeFilter<"ProgressReport"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProgressReportOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProgressReportWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProgressReportWhereInput | ProgressReportWhereInput[]
    OR?: ProgressReportWhereInput[]
    NOT?: ProgressReportWhereInput | ProgressReportWhereInput[]
    projectId?: IntFilter<"ProgressReport"> | number
    title?: StringFilter<"ProgressReport"> | string
    description?: StringNullableFilter<"ProgressReport"> | string | null
    fileUrl?: StringNullableFilter<"ProgressReport"> | string | null
    status?: StringFilter<"ProgressReport"> | string
    createdAt?: DateTimeFilter<"ProgressReport"> | Date | string
    updatedAt?: DateTimeFilter<"ProgressReport"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ProgressReportOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProgressReportCountOrderByAggregateInput
    _avg?: ProgressReportAvgOrderByAggregateInput
    _max?: ProgressReportMaxOrderByAggregateInput
    _min?: ProgressReportMinOrderByAggregateInput
    _sum?: ProgressReportSumOrderByAggregateInput
  }

  export type ProgressReportScalarWhereWithAggregatesInput = {
    AND?: ProgressReportScalarWhereWithAggregatesInput | ProgressReportScalarWhereWithAggregatesInput[]
    OR?: ProgressReportScalarWhereWithAggregatesInput[]
    NOT?: ProgressReportScalarWhereWithAggregatesInput | ProgressReportScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProgressReport"> | number
    projectId?: IntWithAggregatesFilter<"ProgressReport"> | number
    title?: StringWithAggregatesFilter<"ProgressReport"> | string
    description?: StringNullableWithAggregatesFilter<"ProgressReport"> | string | null
    fileUrl?: StringNullableWithAggregatesFilter<"ProgressReport"> | string | null
    status?: StringWithAggregatesFilter<"ProgressReport"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProgressReport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProgressReport"> | Date | string
  }

  export type ExamScheduleWhereInput = {
    AND?: ExamScheduleWhereInput | ExamScheduleWhereInput[]
    OR?: ExamScheduleWhereInput[]
    NOT?: ExamScheduleWhereInput | ExamScheduleWhereInput[]
    id?: IntFilter<"ExamSchedule"> | number
    projectId?: IntFilter<"ExamSchedule"> | number
    type?: StringFilter<"ExamSchedule"> | string
    examDate?: DateTimeNullableFilter<"ExamSchedule"> | Date | string | null
    startTime?: StringNullableFilter<"ExamSchedule"> | string | null
    endTime?: StringNullableFilter<"ExamSchedule"> | string | null
    location?: StringNullableFilter<"ExamSchedule"> | string | null
    status?: StringFilter<"ExamSchedule"> | string
    createdAt?: DateTimeFilter<"ExamSchedule"> | Date | string
    updatedAt?: DateTimeFilter<"ExamSchedule"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ExamScheduleOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    examDate?: SortOrderInput | SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ExamScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ExamScheduleWhereInput | ExamScheduleWhereInput[]
    OR?: ExamScheduleWhereInput[]
    NOT?: ExamScheduleWhereInput | ExamScheduleWhereInput[]
    projectId?: IntFilter<"ExamSchedule"> | number
    type?: StringFilter<"ExamSchedule"> | string
    examDate?: DateTimeNullableFilter<"ExamSchedule"> | Date | string | null
    startTime?: StringNullableFilter<"ExamSchedule"> | string | null
    endTime?: StringNullableFilter<"ExamSchedule"> | string | null
    location?: StringNullableFilter<"ExamSchedule"> | string | null
    status?: StringFilter<"ExamSchedule"> | string
    createdAt?: DateTimeFilter<"ExamSchedule"> | Date | string
    updatedAt?: DateTimeFilter<"ExamSchedule"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id">

  export type ExamScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    examDate?: SortOrderInput | SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExamScheduleCountOrderByAggregateInput
    _avg?: ExamScheduleAvgOrderByAggregateInput
    _max?: ExamScheduleMaxOrderByAggregateInput
    _min?: ExamScheduleMinOrderByAggregateInput
    _sum?: ExamScheduleSumOrderByAggregateInput
  }

  export type ExamScheduleScalarWhereWithAggregatesInput = {
    AND?: ExamScheduleScalarWhereWithAggregatesInput | ExamScheduleScalarWhereWithAggregatesInput[]
    OR?: ExamScheduleScalarWhereWithAggregatesInput[]
    NOT?: ExamScheduleScalarWhereWithAggregatesInput | ExamScheduleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ExamSchedule"> | number
    projectId?: IntWithAggregatesFilter<"ExamSchedule"> | number
    type?: StringWithAggregatesFilter<"ExamSchedule"> | string
    examDate?: DateTimeNullableWithAggregatesFilter<"ExamSchedule"> | Date | string | null
    startTime?: StringNullableWithAggregatesFilter<"ExamSchedule"> | string | null
    endTime?: StringNullableWithAggregatesFilter<"ExamSchedule"> | string | null
    location?: StringNullableWithAggregatesFilter<"ExamSchedule"> | string | null
    status?: StringWithAggregatesFilter<"ExamSchedule"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ExamSchedule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExamSchedule"> | Date | string
  }

  export type UserCreateInput = {
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects1?: ProjectCreateNestedManyWithoutStudent1Input
    projects2?: ProjectCreateNestedManyWithoutStudent2Input
    advisedProjects?: ProjectCreateNestedManyWithoutAdvisorInput
    coAdvisedProjects?: ProjectCreateNestedManyWithoutCoAdvisorInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects1?: ProjectUncheckedCreateNestedManyWithoutStudent1Input
    projects2?: ProjectUncheckedCreateNestedManyWithoutStudent2Input
    advisedProjects?: ProjectUncheckedCreateNestedManyWithoutAdvisorInput
    coAdvisedProjects?: ProjectUncheckedCreateNestedManyWithoutCoAdvisorInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects1?: ProjectUpdateManyWithoutStudent1NestedInput
    projects2?: ProjectUpdateManyWithoutStudent2NestedInput
    advisedProjects?: ProjectUpdateManyWithoutAdvisorNestedInput
    coAdvisedProjects?: ProjectUpdateManyWithoutCoAdvisorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects1?: ProjectUncheckedUpdateManyWithoutStudent1NestedInput
    projects2?: ProjectUncheckedUpdateManyWithoutStudent2NestedInput
    advisedProjects?: ProjectUncheckedUpdateManyWithoutAdvisorNestedInput
    coAdvisedProjects?: ProjectUncheckedUpdateManyWithoutCoAdvisorNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    username: string
    password: string
    fullname?: string | null
    email: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedSteps?: ProjectStepStatusCreateNestedManyWithoutApprovedByInput
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    fullname?: string | null
    email: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedSteps?: ProjectStepStatusUncheckedCreateNestedManyWithoutApprovedByInput
  }

  export type AdminUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedSteps?: ProjectStepStatusUpdateManyWithoutApprovedByNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedSteps?: ProjectStepStatusUncheckedUpdateManyWithoutApprovedByNestedInput
  }

  export type AdminCreateManyInput = {
    id?: number
    username: string
    password: string
    fullname?: string | null
    email: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student1: UserCreateNestedOneWithoutProjects1Input
    student2?: UserCreateNestedOneWithoutProjects2Input
    advisor?: UserCreateNestedOneWithoutAdvisedProjectsInput
    coAdvisor?: UserCreateNestedOneWithoutCoAdvisedProjectsInput
    reports?: ProgressReportCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ProgressReportUncheckedCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleUncheckedCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityUncheckedCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student1?: UserUpdateOneRequiredWithoutProjects1NestedInput
    student2?: UserUpdateOneWithoutProjects2NestedInput
    advisor?: UserUpdateOneWithoutAdvisedProjectsNestedInput
    coAdvisor?: UserUpdateOneWithoutCoAdvisedProjectsNestedInput
    reports?: ProgressReportUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ProgressReportUncheckedUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUncheckedUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUncheckedUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStepStatusCreateInput = {
    step: number
    status?: string
    feedback?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutStepStatusesInput
    approvedBy?: AdminCreateNestedOneWithoutApprovedStepsInput
  }

  export type ProjectStepStatusUncheckedCreateInput = {
    id?: number
    projectId: number
    step: number
    status?: string
    feedback?: string | null
    approvedById?: number | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ProjectStepStatusUpdateInput = {
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutStepStatusesNestedInput
    approvedBy?: AdminUpdateOneWithoutApprovedStepsNestedInput
  }

  export type ProjectStepStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStepStatusCreateManyInput = {
    id?: number
    projectId: number
    step: number
    status?: string
    feedback?: string | null
    approvedById?: number | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ProjectStepStatusUpdateManyMutationInput = {
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStepStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectActivityCreateInput = {
    type: string
    title: string
    description?: string | null
    status?: string | null
    icon?: string | null
    actorName?: string | null
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutActivitiesInput
  }

  export type ProjectActivityUncheckedCreateInput = {
    id?: number
    projectId: number
    type: string
    title: string
    description?: string | null
    status?: string | null
    icon?: string | null
    actorName?: string | null
    createdAt?: Date | string
  }

  export type ProjectActivityUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ProjectActivityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectActivityCreateManyInput = {
    id?: number
    projectId: number
    type: string
    title: string
    description?: string | null
    status?: string | null
    icon?: string | null
    actorName?: string | null
    createdAt?: Date | string
  }

  export type ProjectActivityUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectActivityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressReportCreateInput = {
    title: string
    description?: string | null
    fileUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutReportsInput
  }

  export type ProgressReportUncheckedCreateInput = {
    id?: number
    projectId: number
    title: string
    description?: string | null
    fileUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgressReportUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ProgressReportUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressReportCreateManyInput = {
    id?: number
    projectId: number
    title: string
    description?: string | null
    fileUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgressReportUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressReportUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamScheduleCreateInput = {
    type: string
    examDate?: Date | string | null
    startTime?: string | null
    endTime?: string | null
    location?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutExamsInput
  }

  export type ExamScheduleUncheckedCreateInput = {
    id?: number
    projectId: number
    type: string
    examDate?: Date | string | null
    startTime?: string | null
    endTime?: string | null
    location?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExamScheduleUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    examDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutExamsNestedInput
  }

  export type ExamScheduleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    examDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamScheduleCreateManyInput = {
    id?: number
    projectId: number
    type: string
    examDate?: Date | string | null
    startTime?: string | null
    endTime?: string | null
    location?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExamScheduleUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    examDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamScheduleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    examDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    academicYear?: SortOrder
    tel?: SortOrder
    lineId?: SortOrder
    profileImage?: SortOrder
    role?: SortOrder
    isApproved?: SortOrder
    addressNo?: SortOrder
    moo?: SortOrder
    soi?: SortOrder
    road?: SortOrder
    subdistrict?: SortOrder
    district?: SortOrder
    province?: SortOrder
    zipcode?: SortOrder
    homePhone?: SortOrder
    emergencyContact?: SortOrder
    position?: SortOrder
    department?: SortOrder
    expertise?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    academicYear?: SortOrder
    tel?: SortOrder
    lineId?: SortOrder
    profileImage?: SortOrder
    role?: SortOrder
    isApproved?: SortOrder
    addressNo?: SortOrder
    moo?: SortOrder
    soi?: SortOrder
    road?: SortOrder
    subdistrict?: SortOrder
    district?: SortOrder
    province?: SortOrder
    zipcode?: SortOrder
    homePhone?: SortOrder
    emergencyContact?: SortOrder
    position?: SortOrder
    department?: SortOrder
    expertise?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    academicYear?: SortOrder
    tel?: SortOrder
    lineId?: SortOrder
    profileImage?: SortOrder
    role?: SortOrder
    isApproved?: SortOrder
    addressNo?: SortOrder
    moo?: SortOrder
    soi?: SortOrder
    road?: SortOrder
    subdistrict?: SortOrder
    district?: SortOrder
    province?: SortOrder
    zipcode?: SortOrder
    homePhone?: SortOrder
    emergencyContact?: SortOrder
    position?: SortOrder
    department?: SortOrder
    expertise?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProjectStepStatusListRelationFilter = {
    every?: ProjectStepStatusWhereInput
    some?: ProjectStepStatusWhereInput
    none?: ProjectStepStatusWhereInput
  }

  export type ProjectStepStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    email?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ProgressReportListRelationFilter = {
    every?: ProgressReportWhereInput
    some?: ProgressReportWhereInput
    none?: ProgressReportWhereInput
  }

  export type ExamScheduleListRelationFilter = {
    every?: ExamScheduleWhereInput
    some?: ExamScheduleWhereInput
    none?: ExamScheduleWhereInput
  }

  export type ProjectActivityListRelationFilter = {
    every?: ProjectActivityWhereInput
    some?: ProjectActivityWhereInput
    none?: ProjectActivityWhereInput
  }

  export type ProgressReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExamScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    titleTh?: SortOrder
    titleEn?: SortOrder
    semester?: SortOrder
    academicYear?: SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrder
    thesisUrl?: SortOrder
    programUrl?: SortOrder
    manualUrl?: SortOrder
    student1Id?: SortOrder
    student2Id?: SortOrder
    advisorId?: SortOrder
    coAdvisorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    id?: SortOrder
    step?: SortOrder
    student1Id?: SortOrder
    student2Id?: SortOrder
    advisorId?: SortOrder
    coAdvisorId?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    titleTh?: SortOrder
    titleEn?: SortOrder
    semester?: SortOrder
    academicYear?: SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrder
    thesisUrl?: SortOrder
    programUrl?: SortOrder
    manualUrl?: SortOrder
    student1Id?: SortOrder
    student2Id?: SortOrder
    advisorId?: SortOrder
    coAdvisorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    titleTh?: SortOrder
    titleEn?: SortOrder
    semester?: SortOrder
    academicYear?: SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrder
    thesisUrl?: SortOrder
    programUrl?: SortOrder
    manualUrl?: SortOrder
    student1Id?: SortOrder
    student2Id?: SortOrder
    advisorId?: SortOrder
    coAdvisorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    id?: SortOrder
    step?: SortOrder
    student1Id?: SortOrder
    student2Id?: SortOrder
    advisorId?: SortOrder
    coAdvisorId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type AdminNullableScalarRelationFilter = {
    is?: AdminWhereInput | null
    isNot?: AdminWhereInput | null
  }

  export type ProjectStepStatusProjectIdStepCompoundUniqueInput = {
    projectId: number
    step: number
  }

  export type ProjectStepStatusCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrder
    approvedById?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectStepStatusAvgOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    step?: SortOrder
    approvedById?: SortOrder
  }

  export type ProjectStepStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrder
    approvedById?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectStepStatusMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    step?: SortOrder
    status?: SortOrder
    feedback?: SortOrder
    approvedById?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectStepStatusSumOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    step?: SortOrder
    approvedById?: SortOrder
  }

  export type ProjectActivityCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    icon?: SortOrder
    actorName?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectActivityAvgOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
  }

  export type ProjectActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    icon?: SortOrder
    actorName?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectActivityMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    icon?: SortOrder
    actorName?: SortOrder
    createdAt?: SortOrder
  }

  export type ProjectActivitySumOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
  }

  export type ProgressReportCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    fileUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgressReportAvgOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
  }

  export type ProgressReportMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    fileUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgressReportMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    fileUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgressReportSumOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ExamScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    examDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExamScheduleAvgOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
  }

  export type ExamScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    examDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExamScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    examDate?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExamScheduleSumOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProjectCreateNestedManyWithoutStudent1Input = {
    create?: XOR<ProjectCreateWithoutStudent1Input, ProjectUncheckedCreateWithoutStudent1Input> | ProjectCreateWithoutStudent1Input[] | ProjectUncheckedCreateWithoutStudent1Input[]
    connectOrCreate?: ProjectCreateOrConnectWithoutStudent1Input | ProjectCreateOrConnectWithoutStudent1Input[]
    createMany?: ProjectCreateManyStudent1InputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutStudent2Input = {
    create?: XOR<ProjectCreateWithoutStudent2Input, ProjectUncheckedCreateWithoutStudent2Input> | ProjectCreateWithoutStudent2Input[] | ProjectUncheckedCreateWithoutStudent2Input[]
    connectOrCreate?: ProjectCreateOrConnectWithoutStudent2Input | ProjectCreateOrConnectWithoutStudent2Input[]
    createMany?: ProjectCreateManyStudent2InputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutAdvisorInput = {
    create?: XOR<ProjectCreateWithoutAdvisorInput, ProjectUncheckedCreateWithoutAdvisorInput> | ProjectCreateWithoutAdvisorInput[] | ProjectUncheckedCreateWithoutAdvisorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAdvisorInput | ProjectCreateOrConnectWithoutAdvisorInput[]
    createMany?: ProjectCreateManyAdvisorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutCoAdvisorInput = {
    create?: XOR<ProjectCreateWithoutCoAdvisorInput, ProjectUncheckedCreateWithoutCoAdvisorInput> | ProjectCreateWithoutCoAdvisorInput[] | ProjectUncheckedCreateWithoutCoAdvisorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCoAdvisorInput | ProjectCreateOrConnectWithoutCoAdvisorInput[]
    createMany?: ProjectCreateManyCoAdvisorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutStudent1Input = {
    create?: XOR<ProjectCreateWithoutStudent1Input, ProjectUncheckedCreateWithoutStudent1Input> | ProjectCreateWithoutStudent1Input[] | ProjectUncheckedCreateWithoutStudent1Input[]
    connectOrCreate?: ProjectCreateOrConnectWithoutStudent1Input | ProjectCreateOrConnectWithoutStudent1Input[]
    createMany?: ProjectCreateManyStudent1InputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutStudent2Input = {
    create?: XOR<ProjectCreateWithoutStudent2Input, ProjectUncheckedCreateWithoutStudent2Input> | ProjectCreateWithoutStudent2Input[] | ProjectUncheckedCreateWithoutStudent2Input[]
    connectOrCreate?: ProjectCreateOrConnectWithoutStudent2Input | ProjectCreateOrConnectWithoutStudent2Input[]
    createMany?: ProjectCreateManyStudent2InputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutAdvisorInput = {
    create?: XOR<ProjectCreateWithoutAdvisorInput, ProjectUncheckedCreateWithoutAdvisorInput> | ProjectCreateWithoutAdvisorInput[] | ProjectUncheckedCreateWithoutAdvisorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAdvisorInput | ProjectCreateOrConnectWithoutAdvisorInput[]
    createMany?: ProjectCreateManyAdvisorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutCoAdvisorInput = {
    create?: XOR<ProjectCreateWithoutCoAdvisorInput, ProjectUncheckedCreateWithoutCoAdvisorInput> | ProjectCreateWithoutCoAdvisorInput[] | ProjectUncheckedCreateWithoutCoAdvisorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCoAdvisorInput | ProjectCreateOrConnectWithoutCoAdvisorInput[]
    createMany?: ProjectCreateManyCoAdvisorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectUpdateManyWithoutStudent1NestedInput = {
    create?: XOR<ProjectCreateWithoutStudent1Input, ProjectUncheckedCreateWithoutStudent1Input> | ProjectCreateWithoutStudent1Input[] | ProjectUncheckedCreateWithoutStudent1Input[]
    connectOrCreate?: ProjectCreateOrConnectWithoutStudent1Input | ProjectCreateOrConnectWithoutStudent1Input[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutStudent1Input | ProjectUpsertWithWhereUniqueWithoutStudent1Input[]
    createMany?: ProjectCreateManyStudent1InputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutStudent1Input | ProjectUpdateWithWhereUniqueWithoutStudent1Input[]
    updateMany?: ProjectUpdateManyWithWhereWithoutStudent1Input | ProjectUpdateManyWithWhereWithoutStudent1Input[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutStudent2NestedInput = {
    create?: XOR<ProjectCreateWithoutStudent2Input, ProjectUncheckedCreateWithoutStudent2Input> | ProjectCreateWithoutStudent2Input[] | ProjectUncheckedCreateWithoutStudent2Input[]
    connectOrCreate?: ProjectCreateOrConnectWithoutStudent2Input | ProjectCreateOrConnectWithoutStudent2Input[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutStudent2Input | ProjectUpsertWithWhereUniqueWithoutStudent2Input[]
    createMany?: ProjectCreateManyStudent2InputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutStudent2Input | ProjectUpdateWithWhereUniqueWithoutStudent2Input[]
    updateMany?: ProjectUpdateManyWithWhereWithoutStudent2Input | ProjectUpdateManyWithWhereWithoutStudent2Input[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutAdvisorNestedInput = {
    create?: XOR<ProjectCreateWithoutAdvisorInput, ProjectUncheckedCreateWithoutAdvisorInput> | ProjectCreateWithoutAdvisorInput[] | ProjectUncheckedCreateWithoutAdvisorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAdvisorInput | ProjectCreateOrConnectWithoutAdvisorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutAdvisorInput | ProjectUpsertWithWhereUniqueWithoutAdvisorInput[]
    createMany?: ProjectCreateManyAdvisorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutAdvisorInput | ProjectUpdateWithWhereUniqueWithoutAdvisorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutAdvisorInput | ProjectUpdateManyWithWhereWithoutAdvisorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutCoAdvisorNestedInput = {
    create?: XOR<ProjectCreateWithoutCoAdvisorInput, ProjectUncheckedCreateWithoutCoAdvisorInput> | ProjectCreateWithoutCoAdvisorInput[] | ProjectUncheckedCreateWithoutCoAdvisorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCoAdvisorInput | ProjectCreateOrConnectWithoutCoAdvisorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCoAdvisorInput | ProjectUpsertWithWhereUniqueWithoutCoAdvisorInput[]
    createMany?: ProjectCreateManyCoAdvisorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCoAdvisorInput | ProjectUpdateWithWhereUniqueWithoutCoAdvisorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCoAdvisorInput | ProjectUpdateManyWithWhereWithoutCoAdvisorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUncheckedUpdateManyWithoutStudent1NestedInput = {
    create?: XOR<ProjectCreateWithoutStudent1Input, ProjectUncheckedCreateWithoutStudent1Input> | ProjectCreateWithoutStudent1Input[] | ProjectUncheckedCreateWithoutStudent1Input[]
    connectOrCreate?: ProjectCreateOrConnectWithoutStudent1Input | ProjectCreateOrConnectWithoutStudent1Input[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutStudent1Input | ProjectUpsertWithWhereUniqueWithoutStudent1Input[]
    createMany?: ProjectCreateManyStudent1InputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutStudent1Input | ProjectUpdateWithWhereUniqueWithoutStudent1Input[]
    updateMany?: ProjectUpdateManyWithWhereWithoutStudent1Input | ProjectUpdateManyWithWhereWithoutStudent1Input[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutStudent2NestedInput = {
    create?: XOR<ProjectCreateWithoutStudent2Input, ProjectUncheckedCreateWithoutStudent2Input> | ProjectCreateWithoutStudent2Input[] | ProjectUncheckedCreateWithoutStudent2Input[]
    connectOrCreate?: ProjectCreateOrConnectWithoutStudent2Input | ProjectCreateOrConnectWithoutStudent2Input[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutStudent2Input | ProjectUpsertWithWhereUniqueWithoutStudent2Input[]
    createMany?: ProjectCreateManyStudent2InputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutStudent2Input | ProjectUpdateWithWhereUniqueWithoutStudent2Input[]
    updateMany?: ProjectUpdateManyWithWhereWithoutStudent2Input | ProjectUpdateManyWithWhereWithoutStudent2Input[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutAdvisorNestedInput = {
    create?: XOR<ProjectCreateWithoutAdvisorInput, ProjectUncheckedCreateWithoutAdvisorInput> | ProjectCreateWithoutAdvisorInput[] | ProjectUncheckedCreateWithoutAdvisorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAdvisorInput | ProjectCreateOrConnectWithoutAdvisorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutAdvisorInput | ProjectUpsertWithWhereUniqueWithoutAdvisorInput[]
    createMany?: ProjectCreateManyAdvisorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutAdvisorInput | ProjectUpdateWithWhereUniqueWithoutAdvisorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutAdvisorInput | ProjectUpdateManyWithWhereWithoutAdvisorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutCoAdvisorNestedInput = {
    create?: XOR<ProjectCreateWithoutCoAdvisorInput, ProjectUncheckedCreateWithoutCoAdvisorInput> | ProjectCreateWithoutCoAdvisorInput[] | ProjectUncheckedCreateWithoutCoAdvisorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCoAdvisorInput | ProjectCreateOrConnectWithoutCoAdvisorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCoAdvisorInput | ProjectUpsertWithWhereUniqueWithoutCoAdvisorInput[]
    createMany?: ProjectCreateManyCoAdvisorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCoAdvisorInput | ProjectUpdateWithWhereUniqueWithoutCoAdvisorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCoAdvisorInput | ProjectUpdateManyWithWhereWithoutCoAdvisorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectStepStatusCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<ProjectStepStatusCreateWithoutApprovedByInput, ProjectStepStatusUncheckedCreateWithoutApprovedByInput> | ProjectStepStatusCreateWithoutApprovedByInput[] | ProjectStepStatusUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: ProjectStepStatusCreateOrConnectWithoutApprovedByInput | ProjectStepStatusCreateOrConnectWithoutApprovedByInput[]
    createMany?: ProjectStepStatusCreateManyApprovedByInputEnvelope
    connect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
  }

  export type ProjectStepStatusUncheckedCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<ProjectStepStatusCreateWithoutApprovedByInput, ProjectStepStatusUncheckedCreateWithoutApprovedByInput> | ProjectStepStatusCreateWithoutApprovedByInput[] | ProjectStepStatusUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: ProjectStepStatusCreateOrConnectWithoutApprovedByInput | ProjectStepStatusCreateOrConnectWithoutApprovedByInput[]
    createMany?: ProjectStepStatusCreateManyApprovedByInputEnvelope
    connect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
  }

  export type ProjectStepStatusUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<ProjectStepStatusCreateWithoutApprovedByInput, ProjectStepStatusUncheckedCreateWithoutApprovedByInput> | ProjectStepStatusCreateWithoutApprovedByInput[] | ProjectStepStatusUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: ProjectStepStatusCreateOrConnectWithoutApprovedByInput | ProjectStepStatusCreateOrConnectWithoutApprovedByInput[]
    upsert?: ProjectStepStatusUpsertWithWhereUniqueWithoutApprovedByInput | ProjectStepStatusUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: ProjectStepStatusCreateManyApprovedByInputEnvelope
    set?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    disconnect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    delete?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    connect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    update?: ProjectStepStatusUpdateWithWhereUniqueWithoutApprovedByInput | ProjectStepStatusUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: ProjectStepStatusUpdateManyWithWhereWithoutApprovedByInput | ProjectStepStatusUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: ProjectStepStatusScalarWhereInput | ProjectStepStatusScalarWhereInput[]
  }

  export type ProjectStepStatusUncheckedUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<ProjectStepStatusCreateWithoutApprovedByInput, ProjectStepStatusUncheckedCreateWithoutApprovedByInput> | ProjectStepStatusCreateWithoutApprovedByInput[] | ProjectStepStatusUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: ProjectStepStatusCreateOrConnectWithoutApprovedByInput | ProjectStepStatusCreateOrConnectWithoutApprovedByInput[]
    upsert?: ProjectStepStatusUpsertWithWhereUniqueWithoutApprovedByInput | ProjectStepStatusUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: ProjectStepStatusCreateManyApprovedByInputEnvelope
    set?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    disconnect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    delete?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    connect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    update?: ProjectStepStatusUpdateWithWhereUniqueWithoutApprovedByInput | ProjectStepStatusUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: ProjectStepStatusUpdateManyWithWhereWithoutApprovedByInput | ProjectStepStatusUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: ProjectStepStatusScalarWhereInput | ProjectStepStatusScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProjects1Input = {
    create?: XOR<UserCreateWithoutProjects1Input, UserUncheckedCreateWithoutProjects1Input>
    connectOrCreate?: UserCreateOrConnectWithoutProjects1Input
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProjects2Input = {
    create?: XOR<UserCreateWithoutProjects2Input, UserUncheckedCreateWithoutProjects2Input>
    connectOrCreate?: UserCreateOrConnectWithoutProjects2Input
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAdvisedProjectsInput = {
    create?: XOR<UserCreateWithoutAdvisedProjectsInput, UserUncheckedCreateWithoutAdvisedProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdvisedProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCoAdvisedProjectsInput = {
    create?: XOR<UserCreateWithoutCoAdvisedProjectsInput, UserUncheckedCreateWithoutCoAdvisedProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoAdvisedProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProgressReportCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProgressReportCreateWithoutProjectInput, ProgressReportUncheckedCreateWithoutProjectInput> | ProgressReportCreateWithoutProjectInput[] | ProgressReportUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProgressReportCreateOrConnectWithoutProjectInput | ProgressReportCreateOrConnectWithoutProjectInput[]
    createMany?: ProgressReportCreateManyProjectInputEnvelope
    connect?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
  }

  export type ExamScheduleCreateNestedManyWithoutProjectInput = {
    create?: XOR<ExamScheduleCreateWithoutProjectInput, ExamScheduleUncheckedCreateWithoutProjectInput> | ExamScheduleCreateWithoutProjectInput[] | ExamScheduleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExamScheduleCreateOrConnectWithoutProjectInput | ExamScheduleCreateOrConnectWithoutProjectInput[]
    createMany?: ExamScheduleCreateManyProjectInputEnvelope
    connect?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
  }

  export type ProjectActivityCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectActivityCreateWithoutProjectInput, ProjectActivityUncheckedCreateWithoutProjectInput> | ProjectActivityCreateWithoutProjectInput[] | ProjectActivityUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectActivityCreateOrConnectWithoutProjectInput | ProjectActivityCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectActivityCreateManyProjectInputEnvelope
    connect?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
  }

  export type ProjectStepStatusCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectStepStatusCreateWithoutProjectInput, ProjectStepStatusUncheckedCreateWithoutProjectInput> | ProjectStepStatusCreateWithoutProjectInput[] | ProjectStepStatusUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStepStatusCreateOrConnectWithoutProjectInput | ProjectStepStatusCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectStepStatusCreateManyProjectInputEnvelope
    connect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
  }

  export type ProgressReportUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProgressReportCreateWithoutProjectInput, ProgressReportUncheckedCreateWithoutProjectInput> | ProgressReportCreateWithoutProjectInput[] | ProgressReportUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProgressReportCreateOrConnectWithoutProjectInput | ProgressReportCreateOrConnectWithoutProjectInput[]
    createMany?: ProgressReportCreateManyProjectInputEnvelope
    connect?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
  }

  export type ExamScheduleUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ExamScheduleCreateWithoutProjectInput, ExamScheduleUncheckedCreateWithoutProjectInput> | ExamScheduleCreateWithoutProjectInput[] | ExamScheduleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExamScheduleCreateOrConnectWithoutProjectInput | ExamScheduleCreateOrConnectWithoutProjectInput[]
    createMany?: ExamScheduleCreateManyProjectInputEnvelope
    connect?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
  }

  export type ProjectActivityUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectActivityCreateWithoutProjectInput, ProjectActivityUncheckedCreateWithoutProjectInput> | ProjectActivityCreateWithoutProjectInput[] | ProjectActivityUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectActivityCreateOrConnectWithoutProjectInput | ProjectActivityCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectActivityCreateManyProjectInputEnvelope
    connect?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
  }

  export type ProjectStepStatusUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectStepStatusCreateWithoutProjectInput, ProjectStepStatusUncheckedCreateWithoutProjectInput> | ProjectStepStatusCreateWithoutProjectInput[] | ProjectStepStatusUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStepStatusCreateOrConnectWithoutProjectInput | ProjectStepStatusCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectStepStatusCreateManyProjectInputEnvelope
    connect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutProjects1NestedInput = {
    create?: XOR<UserCreateWithoutProjects1Input, UserUncheckedCreateWithoutProjects1Input>
    connectOrCreate?: UserCreateOrConnectWithoutProjects1Input
    upsert?: UserUpsertWithoutProjects1Input
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjects1Input, UserUpdateWithoutProjects1Input>, UserUncheckedUpdateWithoutProjects1Input>
  }

  export type UserUpdateOneWithoutProjects2NestedInput = {
    create?: XOR<UserCreateWithoutProjects2Input, UserUncheckedCreateWithoutProjects2Input>
    connectOrCreate?: UserCreateOrConnectWithoutProjects2Input
    upsert?: UserUpsertWithoutProjects2Input
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjects2Input, UserUpdateWithoutProjects2Input>, UserUncheckedUpdateWithoutProjects2Input>
  }

  export type UserUpdateOneWithoutAdvisedProjectsNestedInput = {
    create?: XOR<UserCreateWithoutAdvisedProjectsInput, UserUncheckedCreateWithoutAdvisedProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdvisedProjectsInput
    upsert?: UserUpsertWithoutAdvisedProjectsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdvisedProjectsInput, UserUpdateWithoutAdvisedProjectsInput>, UserUncheckedUpdateWithoutAdvisedProjectsInput>
  }

  export type UserUpdateOneWithoutCoAdvisedProjectsNestedInput = {
    create?: XOR<UserCreateWithoutCoAdvisedProjectsInput, UserUncheckedCreateWithoutCoAdvisedProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCoAdvisedProjectsInput
    upsert?: UserUpsertWithoutCoAdvisedProjectsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCoAdvisedProjectsInput, UserUpdateWithoutCoAdvisedProjectsInput>, UserUncheckedUpdateWithoutCoAdvisedProjectsInput>
  }

  export type ProgressReportUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProgressReportCreateWithoutProjectInput, ProgressReportUncheckedCreateWithoutProjectInput> | ProgressReportCreateWithoutProjectInput[] | ProgressReportUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProgressReportCreateOrConnectWithoutProjectInput | ProgressReportCreateOrConnectWithoutProjectInput[]
    upsert?: ProgressReportUpsertWithWhereUniqueWithoutProjectInput | ProgressReportUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProgressReportCreateManyProjectInputEnvelope
    set?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
    disconnect?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
    delete?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
    connect?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
    update?: ProgressReportUpdateWithWhereUniqueWithoutProjectInput | ProgressReportUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProgressReportUpdateManyWithWhereWithoutProjectInput | ProgressReportUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProgressReportScalarWhereInput | ProgressReportScalarWhereInput[]
  }

  export type ExamScheduleUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ExamScheduleCreateWithoutProjectInput, ExamScheduleUncheckedCreateWithoutProjectInput> | ExamScheduleCreateWithoutProjectInput[] | ExamScheduleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExamScheduleCreateOrConnectWithoutProjectInput | ExamScheduleCreateOrConnectWithoutProjectInput[]
    upsert?: ExamScheduleUpsertWithWhereUniqueWithoutProjectInput | ExamScheduleUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ExamScheduleCreateManyProjectInputEnvelope
    set?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
    disconnect?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
    delete?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
    connect?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
    update?: ExamScheduleUpdateWithWhereUniqueWithoutProjectInput | ExamScheduleUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ExamScheduleUpdateManyWithWhereWithoutProjectInput | ExamScheduleUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ExamScheduleScalarWhereInput | ExamScheduleScalarWhereInput[]
  }

  export type ProjectActivityUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectActivityCreateWithoutProjectInput, ProjectActivityUncheckedCreateWithoutProjectInput> | ProjectActivityCreateWithoutProjectInput[] | ProjectActivityUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectActivityCreateOrConnectWithoutProjectInput | ProjectActivityCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectActivityUpsertWithWhereUniqueWithoutProjectInput | ProjectActivityUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectActivityCreateManyProjectInputEnvelope
    set?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
    disconnect?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
    delete?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
    connect?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
    update?: ProjectActivityUpdateWithWhereUniqueWithoutProjectInput | ProjectActivityUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectActivityUpdateManyWithWhereWithoutProjectInput | ProjectActivityUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectActivityScalarWhereInput | ProjectActivityScalarWhereInput[]
  }

  export type ProjectStepStatusUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectStepStatusCreateWithoutProjectInput, ProjectStepStatusUncheckedCreateWithoutProjectInput> | ProjectStepStatusCreateWithoutProjectInput[] | ProjectStepStatusUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStepStatusCreateOrConnectWithoutProjectInput | ProjectStepStatusCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectStepStatusUpsertWithWhereUniqueWithoutProjectInput | ProjectStepStatusUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectStepStatusCreateManyProjectInputEnvelope
    set?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    disconnect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    delete?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    connect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    update?: ProjectStepStatusUpdateWithWhereUniqueWithoutProjectInput | ProjectStepStatusUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectStepStatusUpdateManyWithWhereWithoutProjectInput | ProjectStepStatusUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectStepStatusScalarWhereInput | ProjectStepStatusScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProgressReportUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProgressReportCreateWithoutProjectInput, ProgressReportUncheckedCreateWithoutProjectInput> | ProgressReportCreateWithoutProjectInput[] | ProgressReportUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProgressReportCreateOrConnectWithoutProjectInput | ProgressReportCreateOrConnectWithoutProjectInput[]
    upsert?: ProgressReportUpsertWithWhereUniqueWithoutProjectInput | ProgressReportUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProgressReportCreateManyProjectInputEnvelope
    set?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
    disconnect?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
    delete?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
    connect?: ProgressReportWhereUniqueInput | ProgressReportWhereUniqueInput[]
    update?: ProgressReportUpdateWithWhereUniqueWithoutProjectInput | ProgressReportUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProgressReportUpdateManyWithWhereWithoutProjectInput | ProgressReportUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProgressReportScalarWhereInput | ProgressReportScalarWhereInput[]
  }

  export type ExamScheduleUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ExamScheduleCreateWithoutProjectInput, ExamScheduleUncheckedCreateWithoutProjectInput> | ExamScheduleCreateWithoutProjectInput[] | ExamScheduleUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ExamScheduleCreateOrConnectWithoutProjectInput | ExamScheduleCreateOrConnectWithoutProjectInput[]
    upsert?: ExamScheduleUpsertWithWhereUniqueWithoutProjectInput | ExamScheduleUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ExamScheduleCreateManyProjectInputEnvelope
    set?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
    disconnect?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
    delete?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
    connect?: ExamScheduleWhereUniqueInput | ExamScheduleWhereUniqueInput[]
    update?: ExamScheduleUpdateWithWhereUniqueWithoutProjectInput | ExamScheduleUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ExamScheduleUpdateManyWithWhereWithoutProjectInput | ExamScheduleUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ExamScheduleScalarWhereInput | ExamScheduleScalarWhereInput[]
  }

  export type ProjectActivityUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectActivityCreateWithoutProjectInput, ProjectActivityUncheckedCreateWithoutProjectInput> | ProjectActivityCreateWithoutProjectInput[] | ProjectActivityUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectActivityCreateOrConnectWithoutProjectInput | ProjectActivityCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectActivityUpsertWithWhereUniqueWithoutProjectInput | ProjectActivityUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectActivityCreateManyProjectInputEnvelope
    set?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
    disconnect?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
    delete?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
    connect?: ProjectActivityWhereUniqueInput | ProjectActivityWhereUniqueInput[]
    update?: ProjectActivityUpdateWithWhereUniqueWithoutProjectInput | ProjectActivityUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectActivityUpdateManyWithWhereWithoutProjectInput | ProjectActivityUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectActivityScalarWhereInput | ProjectActivityScalarWhereInput[]
  }

  export type ProjectStepStatusUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectStepStatusCreateWithoutProjectInput, ProjectStepStatusUncheckedCreateWithoutProjectInput> | ProjectStepStatusCreateWithoutProjectInput[] | ProjectStepStatusUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectStepStatusCreateOrConnectWithoutProjectInput | ProjectStepStatusCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectStepStatusUpsertWithWhereUniqueWithoutProjectInput | ProjectStepStatusUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectStepStatusCreateManyProjectInputEnvelope
    set?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    disconnect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    delete?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    connect?: ProjectStepStatusWhereUniqueInput | ProjectStepStatusWhereUniqueInput[]
    update?: ProjectStepStatusUpdateWithWhereUniqueWithoutProjectInput | ProjectStepStatusUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectStepStatusUpdateManyWithWhereWithoutProjectInput | ProjectStepStatusUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectStepStatusScalarWhereInput | ProjectStepStatusScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutStepStatusesInput = {
    create?: XOR<ProjectCreateWithoutStepStatusesInput, ProjectUncheckedCreateWithoutStepStatusesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutStepStatusesInput
    connect?: ProjectWhereUniqueInput
  }

  export type AdminCreateNestedOneWithoutApprovedStepsInput = {
    create?: XOR<AdminCreateWithoutApprovedStepsInput, AdminUncheckedCreateWithoutApprovedStepsInput>
    connectOrCreate?: AdminCreateOrConnectWithoutApprovedStepsInput
    connect?: AdminWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutStepStatusesNestedInput = {
    create?: XOR<ProjectCreateWithoutStepStatusesInput, ProjectUncheckedCreateWithoutStepStatusesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutStepStatusesInput
    upsert?: ProjectUpsertWithoutStepStatusesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutStepStatusesInput, ProjectUpdateWithoutStepStatusesInput>, ProjectUncheckedUpdateWithoutStepStatusesInput>
  }

  export type AdminUpdateOneWithoutApprovedStepsNestedInput = {
    create?: XOR<AdminCreateWithoutApprovedStepsInput, AdminUncheckedCreateWithoutApprovedStepsInput>
    connectOrCreate?: AdminCreateOrConnectWithoutApprovedStepsInput
    upsert?: AdminUpsertWithoutApprovedStepsInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutApprovedStepsInput, AdminUpdateWithoutApprovedStepsInput>, AdminUncheckedUpdateWithoutApprovedStepsInput>
  }

  export type ProjectCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<ProjectCreateWithoutActivitiesInput, ProjectUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutActivitiesInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<ProjectCreateWithoutActivitiesInput, ProjectUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutActivitiesInput
    upsert?: ProjectUpsertWithoutActivitiesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutActivitiesInput, ProjectUpdateWithoutActivitiesInput>, ProjectUncheckedUpdateWithoutActivitiesInput>
  }

  export type ProjectCreateNestedOneWithoutReportsInput = {
    create?: XOR<ProjectCreateWithoutReportsInput, ProjectUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutReportsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<ProjectCreateWithoutReportsInput, ProjectUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutReportsInput
    upsert?: ProjectUpsertWithoutReportsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutReportsInput, ProjectUpdateWithoutReportsInput>, ProjectUncheckedUpdateWithoutReportsInput>
  }

  export type ProjectCreateNestedOneWithoutExamsInput = {
    create?: XOR<ProjectCreateWithoutExamsInput, ProjectUncheckedCreateWithoutExamsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutExamsInput
    connect?: ProjectWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProjectUpdateOneRequiredWithoutExamsNestedInput = {
    create?: XOR<ProjectCreateWithoutExamsInput, ProjectUncheckedCreateWithoutExamsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutExamsInput
    upsert?: ProjectUpsertWithoutExamsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutExamsInput, ProjectUpdateWithoutExamsInput>, ProjectUncheckedUpdateWithoutExamsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProjectCreateWithoutStudent1Input = {
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student2?: UserCreateNestedOneWithoutProjects2Input
    advisor?: UserCreateNestedOneWithoutAdvisedProjectsInput
    coAdvisor?: UserCreateNestedOneWithoutCoAdvisedProjectsInput
    reports?: ProgressReportCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutStudent1Input = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student2Id?: number | null
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ProgressReportUncheckedCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleUncheckedCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityUncheckedCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutStudent1Input = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutStudent1Input, ProjectUncheckedCreateWithoutStudent1Input>
  }

  export type ProjectCreateManyStudent1InputEnvelope = {
    data: ProjectCreateManyStudent1Input | ProjectCreateManyStudent1Input[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutStudent2Input = {
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student1: UserCreateNestedOneWithoutProjects1Input
    advisor?: UserCreateNestedOneWithoutAdvisedProjectsInput
    coAdvisor?: UserCreateNestedOneWithoutCoAdvisedProjectsInput
    reports?: ProgressReportCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutStudent2Input = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ProgressReportUncheckedCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleUncheckedCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityUncheckedCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutStudent2Input = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutStudent2Input, ProjectUncheckedCreateWithoutStudent2Input>
  }

  export type ProjectCreateManyStudent2InputEnvelope = {
    data: ProjectCreateManyStudent2Input | ProjectCreateManyStudent2Input[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutAdvisorInput = {
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student1: UserCreateNestedOneWithoutProjects1Input
    student2?: UserCreateNestedOneWithoutProjects2Input
    coAdvisor?: UserCreateNestedOneWithoutCoAdvisedProjectsInput
    reports?: ProgressReportCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutAdvisorInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ProgressReportUncheckedCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleUncheckedCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityUncheckedCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutAdvisorInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutAdvisorInput, ProjectUncheckedCreateWithoutAdvisorInput>
  }

  export type ProjectCreateManyAdvisorInputEnvelope = {
    data: ProjectCreateManyAdvisorInput | ProjectCreateManyAdvisorInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutCoAdvisorInput = {
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student1: UserCreateNestedOneWithoutProjects1Input
    student2?: UserCreateNestedOneWithoutProjects2Input
    advisor?: UserCreateNestedOneWithoutAdvisedProjectsInput
    reports?: ProgressReportCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutCoAdvisorInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    advisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ProgressReportUncheckedCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleUncheckedCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityUncheckedCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutCoAdvisorInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCoAdvisorInput, ProjectUncheckedCreateWithoutCoAdvisorInput>
  }

  export type ProjectCreateManyCoAdvisorInputEnvelope = {
    data: ProjectCreateManyCoAdvisorInput | ProjectCreateManyCoAdvisorInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutStudent1Input = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutStudent1Input, ProjectUncheckedUpdateWithoutStudent1Input>
    create: XOR<ProjectCreateWithoutStudent1Input, ProjectUncheckedCreateWithoutStudent1Input>
  }

  export type ProjectUpdateWithWhereUniqueWithoutStudent1Input = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutStudent1Input, ProjectUncheckedUpdateWithoutStudent1Input>
  }

  export type ProjectUpdateManyWithWhereWithoutStudent1Input = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutStudent1Input>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: IntFilter<"Project"> | number
    titleTh?: StringFilter<"Project"> | string
    titleEn?: StringNullableFilter<"Project"> | string | null
    semester?: StringNullableFilter<"Project"> | string | null
    academicYear?: StringNullableFilter<"Project"> | string | null
    step?: IntFilter<"Project"> | number
    status?: StringFilter<"Project"> | string
    feedback?: StringNullableFilter<"Project"> | string | null
    thesisUrl?: StringNullableFilter<"Project"> | string | null
    programUrl?: StringNullableFilter<"Project"> | string | null
    manualUrl?: StringNullableFilter<"Project"> | string | null
    student1Id?: IntFilter<"Project"> | number
    student2Id?: IntNullableFilter<"Project"> | number | null
    advisorId?: IntNullableFilter<"Project"> | number | null
    coAdvisorId?: IntNullableFilter<"Project"> | number | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutStudent2Input = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutStudent2Input, ProjectUncheckedUpdateWithoutStudent2Input>
    create: XOR<ProjectCreateWithoutStudent2Input, ProjectUncheckedCreateWithoutStudent2Input>
  }

  export type ProjectUpdateWithWhereUniqueWithoutStudent2Input = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutStudent2Input, ProjectUncheckedUpdateWithoutStudent2Input>
  }

  export type ProjectUpdateManyWithWhereWithoutStudent2Input = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutStudent2Input>
  }

  export type ProjectUpsertWithWhereUniqueWithoutAdvisorInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutAdvisorInput, ProjectUncheckedUpdateWithoutAdvisorInput>
    create: XOR<ProjectCreateWithoutAdvisorInput, ProjectUncheckedCreateWithoutAdvisorInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutAdvisorInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutAdvisorInput, ProjectUncheckedUpdateWithoutAdvisorInput>
  }

  export type ProjectUpdateManyWithWhereWithoutAdvisorInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutAdvisorInput>
  }

  export type ProjectUpsertWithWhereUniqueWithoutCoAdvisorInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutCoAdvisorInput, ProjectUncheckedUpdateWithoutCoAdvisorInput>
    create: XOR<ProjectCreateWithoutCoAdvisorInput, ProjectUncheckedCreateWithoutCoAdvisorInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutCoAdvisorInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutCoAdvisorInput, ProjectUncheckedUpdateWithoutCoAdvisorInput>
  }

  export type ProjectUpdateManyWithWhereWithoutCoAdvisorInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutCoAdvisorInput>
  }

  export type ProjectStepStatusCreateWithoutApprovedByInput = {
    step: number
    status?: string
    feedback?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutStepStatusesInput
  }

  export type ProjectStepStatusUncheckedCreateWithoutApprovedByInput = {
    id?: number
    projectId: number
    step: number
    status?: string
    feedback?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ProjectStepStatusCreateOrConnectWithoutApprovedByInput = {
    where: ProjectStepStatusWhereUniqueInput
    create: XOR<ProjectStepStatusCreateWithoutApprovedByInput, ProjectStepStatusUncheckedCreateWithoutApprovedByInput>
  }

  export type ProjectStepStatusCreateManyApprovedByInputEnvelope = {
    data: ProjectStepStatusCreateManyApprovedByInput | ProjectStepStatusCreateManyApprovedByInput[]
    skipDuplicates?: boolean
  }

  export type ProjectStepStatusUpsertWithWhereUniqueWithoutApprovedByInput = {
    where: ProjectStepStatusWhereUniqueInput
    update: XOR<ProjectStepStatusUpdateWithoutApprovedByInput, ProjectStepStatusUncheckedUpdateWithoutApprovedByInput>
    create: XOR<ProjectStepStatusCreateWithoutApprovedByInput, ProjectStepStatusUncheckedCreateWithoutApprovedByInput>
  }

  export type ProjectStepStatusUpdateWithWhereUniqueWithoutApprovedByInput = {
    where: ProjectStepStatusWhereUniqueInput
    data: XOR<ProjectStepStatusUpdateWithoutApprovedByInput, ProjectStepStatusUncheckedUpdateWithoutApprovedByInput>
  }

  export type ProjectStepStatusUpdateManyWithWhereWithoutApprovedByInput = {
    where: ProjectStepStatusScalarWhereInput
    data: XOR<ProjectStepStatusUpdateManyMutationInput, ProjectStepStatusUncheckedUpdateManyWithoutApprovedByInput>
  }

  export type ProjectStepStatusScalarWhereInput = {
    AND?: ProjectStepStatusScalarWhereInput | ProjectStepStatusScalarWhereInput[]
    OR?: ProjectStepStatusScalarWhereInput[]
    NOT?: ProjectStepStatusScalarWhereInput | ProjectStepStatusScalarWhereInput[]
    id?: IntFilter<"ProjectStepStatus"> | number
    projectId?: IntFilter<"ProjectStepStatus"> | number
    step?: IntFilter<"ProjectStepStatus"> | number
    status?: StringFilter<"ProjectStepStatus"> | string
    feedback?: StringNullableFilter<"ProjectStepStatus"> | string | null
    approvedById?: IntNullableFilter<"ProjectStepStatus"> | number | null
    updatedAt?: DateTimeFilter<"ProjectStepStatus"> | Date | string
    createdAt?: DateTimeFilter<"ProjectStepStatus"> | Date | string
  }

  export type UserCreateWithoutProjects1Input = {
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects2?: ProjectCreateNestedManyWithoutStudent2Input
    advisedProjects?: ProjectCreateNestedManyWithoutAdvisorInput
    coAdvisedProjects?: ProjectCreateNestedManyWithoutCoAdvisorInput
  }

  export type UserUncheckedCreateWithoutProjects1Input = {
    id?: number
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects2?: ProjectUncheckedCreateNestedManyWithoutStudent2Input
    advisedProjects?: ProjectUncheckedCreateNestedManyWithoutAdvisorInput
    coAdvisedProjects?: ProjectUncheckedCreateNestedManyWithoutCoAdvisorInput
  }

  export type UserCreateOrConnectWithoutProjects1Input = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjects1Input, UserUncheckedCreateWithoutProjects1Input>
  }

  export type UserCreateWithoutProjects2Input = {
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects1?: ProjectCreateNestedManyWithoutStudent1Input
    advisedProjects?: ProjectCreateNestedManyWithoutAdvisorInput
    coAdvisedProjects?: ProjectCreateNestedManyWithoutCoAdvisorInput
  }

  export type UserUncheckedCreateWithoutProjects2Input = {
    id?: number
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects1?: ProjectUncheckedCreateNestedManyWithoutStudent1Input
    advisedProjects?: ProjectUncheckedCreateNestedManyWithoutAdvisorInput
    coAdvisedProjects?: ProjectUncheckedCreateNestedManyWithoutCoAdvisorInput
  }

  export type UserCreateOrConnectWithoutProjects2Input = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjects2Input, UserUncheckedCreateWithoutProjects2Input>
  }

  export type UserCreateWithoutAdvisedProjectsInput = {
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects1?: ProjectCreateNestedManyWithoutStudent1Input
    projects2?: ProjectCreateNestedManyWithoutStudent2Input
    coAdvisedProjects?: ProjectCreateNestedManyWithoutCoAdvisorInput
  }

  export type UserUncheckedCreateWithoutAdvisedProjectsInput = {
    id?: number
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects1?: ProjectUncheckedCreateNestedManyWithoutStudent1Input
    projects2?: ProjectUncheckedCreateNestedManyWithoutStudent2Input
    coAdvisedProjects?: ProjectUncheckedCreateNestedManyWithoutCoAdvisorInput
  }

  export type UserCreateOrConnectWithoutAdvisedProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdvisedProjectsInput, UserUncheckedCreateWithoutAdvisedProjectsInput>
  }

  export type UserCreateWithoutCoAdvisedProjectsInput = {
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects1?: ProjectCreateNestedManyWithoutStudent1Input
    projects2?: ProjectCreateNestedManyWithoutStudent2Input
    advisedProjects?: ProjectCreateNestedManyWithoutAdvisorInput
  }

  export type UserUncheckedCreateWithoutCoAdvisedProjectsInput = {
    id?: number
    username: string
    email: string
    password: string
    fullname?: string | null
    academicYear?: string | null
    tel?: string | null
    lineId?: string | null
    profileImage?: string | null
    role?: string
    isApproved?: boolean
    addressNo?: string | null
    moo?: string | null
    soi?: string | null
    road?: string | null
    subdistrict?: string | null
    district?: string | null
    province?: string | null
    zipcode?: string | null
    homePhone?: string | null
    emergencyContact?: string | null
    position?: string | null
    department?: string | null
    expertise?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects1?: ProjectUncheckedCreateNestedManyWithoutStudent1Input
    projects2?: ProjectUncheckedCreateNestedManyWithoutStudent2Input
    advisedProjects?: ProjectUncheckedCreateNestedManyWithoutAdvisorInput
  }

  export type UserCreateOrConnectWithoutCoAdvisedProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCoAdvisedProjectsInput, UserUncheckedCreateWithoutCoAdvisedProjectsInput>
  }

  export type ProgressReportCreateWithoutProjectInput = {
    title: string
    description?: string | null
    fileUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgressReportUncheckedCreateWithoutProjectInput = {
    id?: number
    title: string
    description?: string | null
    fileUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgressReportCreateOrConnectWithoutProjectInput = {
    where: ProgressReportWhereUniqueInput
    create: XOR<ProgressReportCreateWithoutProjectInput, ProgressReportUncheckedCreateWithoutProjectInput>
  }

  export type ProgressReportCreateManyProjectInputEnvelope = {
    data: ProgressReportCreateManyProjectInput | ProgressReportCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ExamScheduleCreateWithoutProjectInput = {
    type: string
    examDate?: Date | string | null
    startTime?: string | null
    endTime?: string | null
    location?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExamScheduleUncheckedCreateWithoutProjectInput = {
    id?: number
    type: string
    examDate?: Date | string | null
    startTime?: string | null
    endTime?: string | null
    location?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExamScheduleCreateOrConnectWithoutProjectInput = {
    where: ExamScheduleWhereUniqueInput
    create: XOR<ExamScheduleCreateWithoutProjectInput, ExamScheduleUncheckedCreateWithoutProjectInput>
  }

  export type ExamScheduleCreateManyProjectInputEnvelope = {
    data: ExamScheduleCreateManyProjectInput | ExamScheduleCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectActivityCreateWithoutProjectInput = {
    type: string
    title: string
    description?: string | null
    status?: string | null
    icon?: string | null
    actorName?: string | null
    createdAt?: Date | string
  }

  export type ProjectActivityUncheckedCreateWithoutProjectInput = {
    id?: number
    type: string
    title: string
    description?: string | null
    status?: string | null
    icon?: string | null
    actorName?: string | null
    createdAt?: Date | string
  }

  export type ProjectActivityCreateOrConnectWithoutProjectInput = {
    where: ProjectActivityWhereUniqueInput
    create: XOR<ProjectActivityCreateWithoutProjectInput, ProjectActivityUncheckedCreateWithoutProjectInput>
  }

  export type ProjectActivityCreateManyProjectInputEnvelope = {
    data: ProjectActivityCreateManyProjectInput | ProjectActivityCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectStepStatusCreateWithoutProjectInput = {
    step: number
    status?: string
    feedback?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
    approvedBy?: AdminCreateNestedOneWithoutApprovedStepsInput
  }

  export type ProjectStepStatusUncheckedCreateWithoutProjectInput = {
    id?: number
    step: number
    status?: string
    feedback?: string | null
    approvedById?: number | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ProjectStepStatusCreateOrConnectWithoutProjectInput = {
    where: ProjectStepStatusWhereUniqueInput
    create: XOR<ProjectStepStatusCreateWithoutProjectInput, ProjectStepStatusUncheckedCreateWithoutProjectInput>
  }

  export type ProjectStepStatusCreateManyProjectInputEnvelope = {
    data: ProjectStepStatusCreateManyProjectInput | ProjectStepStatusCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjects1Input = {
    update: XOR<UserUpdateWithoutProjects1Input, UserUncheckedUpdateWithoutProjects1Input>
    create: XOR<UserCreateWithoutProjects1Input, UserUncheckedCreateWithoutProjects1Input>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjects1Input = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjects1Input, UserUncheckedUpdateWithoutProjects1Input>
  }

  export type UserUpdateWithoutProjects1Input = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects2?: ProjectUpdateManyWithoutStudent2NestedInput
    advisedProjects?: ProjectUpdateManyWithoutAdvisorNestedInput
    coAdvisedProjects?: ProjectUpdateManyWithoutCoAdvisorNestedInput
  }

  export type UserUncheckedUpdateWithoutProjects1Input = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects2?: ProjectUncheckedUpdateManyWithoutStudent2NestedInput
    advisedProjects?: ProjectUncheckedUpdateManyWithoutAdvisorNestedInput
    coAdvisedProjects?: ProjectUncheckedUpdateManyWithoutCoAdvisorNestedInput
  }

  export type UserUpsertWithoutProjects2Input = {
    update: XOR<UserUpdateWithoutProjects2Input, UserUncheckedUpdateWithoutProjects2Input>
    create: XOR<UserCreateWithoutProjects2Input, UserUncheckedCreateWithoutProjects2Input>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjects2Input = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjects2Input, UserUncheckedUpdateWithoutProjects2Input>
  }

  export type UserUpdateWithoutProjects2Input = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects1?: ProjectUpdateManyWithoutStudent1NestedInput
    advisedProjects?: ProjectUpdateManyWithoutAdvisorNestedInput
    coAdvisedProjects?: ProjectUpdateManyWithoutCoAdvisorNestedInput
  }

  export type UserUncheckedUpdateWithoutProjects2Input = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects1?: ProjectUncheckedUpdateManyWithoutStudent1NestedInput
    advisedProjects?: ProjectUncheckedUpdateManyWithoutAdvisorNestedInput
    coAdvisedProjects?: ProjectUncheckedUpdateManyWithoutCoAdvisorNestedInput
  }

  export type UserUpsertWithoutAdvisedProjectsInput = {
    update: XOR<UserUpdateWithoutAdvisedProjectsInput, UserUncheckedUpdateWithoutAdvisedProjectsInput>
    create: XOR<UserCreateWithoutAdvisedProjectsInput, UserUncheckedCreateWithoutAdvisedProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdvisedProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdvisedProjectsInput, UserUncheckedUpdateWithoutAdvisedProjectsInput>
  }

  export type UserUpdateWithoutAdvisedProjectsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects1?: ProjectUpdateManyWithoutStudent1NestedInput
    projects2?: ProjectUpdateManyWithoutStudent2NestedInput
    coAdvisedProjects?: ProjectUpdateManyWithoutCoAdvisorNestedInput
  }

  export type UserUncheckedUpdateWithoutAdvisedProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects1?: ProjectUncheckedUpdateManyWithoutStudent1NestedInput
    projects2?: ProjectUncheckedUpdateManyWithoutStudent2NestedInput
    coAdvisedProjects?: ProjectUncheckedUpdateManyWithoutCoAdvisorNestedInput
  }

  export type UserUpsertWithoutCoAdvisedProjectsInput = {
    update: XOR<UserUpdateWithoutCoAdvisedProjectsInput, UserUncheckedUpdateWithoutCoAdvisedProjectsInput>
    create: XOR<UserCreateWithoutCoAdvisedProjectsInput, UserUncheckedCreateWithoutCoAdvisedProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCoAdvisedProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCoAdvisedProjectsInput, UserUncheckedUpdateWithoutCoAdvisedProjectsInput>
  }

  export type UserUpdateWithoutCoAdvisedProjectsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects1?: ProjectUpdateManyWithoutStudent1NestedInput
    projects2?: ProjectUpdateManyWithoutStudent2NestedInput
    advisedProjects?: ProjectUpdateManyWithoutAdvisorNestedInput
  }

  export type UserUncheckedUpdateWithoutCoAdvisedProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    lineId?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    isApproved?: BoolFieldUpdateOperationsInput | boolean
    addressNo?: NullableStringFieldUpdateOperationsInput | string | null
    moo?: NullableStringFieldUpdateOperationsInput | string | null
    soi?: NullableStringFieldUpdateOperationsInput | string | null
    road?: NullableStringFieldUpdateOperationsInput | string | null
    subdistrict?: NullableStringFieldUpdateOperationsInput | string | null
    district?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    zipcode?: NullableStringFieldUpdateOperationsInput | string | null
    homePhone?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContact?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    expertise?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects1?: ProjectUncheckedUpdateManyWithoutStudent1NestedInput
    projects2?: ProjectUncheckedUpdateManyWithoutStudent2NestedInput
    advisedProjects?: ProjectUncheckedUpdateManyWithoutAdvisorNestedInput
  }

  export type ProgressReportUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProgressReportWhereUniqueInput
    update: XOR<ProgressReportUpdateWithoutProjectInput, ProgressReportUncheckedUpdateWithoutProjectInput>
    create: XOR<ProgressReportCreateWithoutProjectInput, ProgressReportUncheckedCreateWithoutProjectInput>
  }

  export type ProgressReportUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProgressReportWhereUniqueInput
    data: XOR<ProgressReportUpdateWithoutProjectInput, ProgressReportUncheckedUpdateWithoutProjectInput>
  }

  export type ProgressReportUpdateManyWithWhereWithoutProjectInput = {
    where: ProgressReportScalarWhereInput
    data: XOR<ProgressReportUpdateManyMutationInput, ProgressReportUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProgressReportScalarWhereInput = {
    AND?: ProgressReportScalarWhereInput | ProgressReportScalarWhereInput[]
    OR?: ProgressReportScalarWhereInput[]
    NOT?: ProgressReportScalarWhereInput | ProgressReportScalarWhereInput[]
    id?: IntFilter<"ProgressReport"> | number
    projectId?: IntFilter<"ProgressReport"> | number
    title?: StringFilter<"ProgressReport"> | string
    description?: StringNullableFilter<"ProgressReport"> | string | null
    fileUrl?: StringNullableFilter<"ProgressReport"> | string | null
    status?: StringFilter<"ProgressReport"> | string
    createdAt?: DateTimeFilter<"ProgressReport"> | Date | string
    updatedAt?: DateTimeFilter<"ProgressReport"> | Date | string
  }

  export type ExamScheduleUpsertWithWhereUniqueWithoutProjectInput = {
    where: ExamScheduleWhereUniqueInput
    update: XOR<ExamScheduleUpdateWithoutProjectInput, ExamScheduleUncheckedUpdateWithoutProjectInput>
    create: XOR<ExamScheduleCreateWithoutProjectInput, ExamScheduleUncheckedCreateWithoutProjectInput>
  }

  export type ExamScheduleUpdateWithWhereUniqueWithoutProjectInput = {
    where: ExamScheduleWhereUniqueInput
    data: XOR<ExamScheduleUpdateWithoutProjectInput, ExamScheduleUncheckedUpdateWithoutProjectInput>
  }

  export type ExamScheduleUpdateManyWithWhereWithoutProjectInput = {
    where: ExamScheduleScalarWhereInput
    data: XOR<ExamScheduleUpdateManyMutationInput, ExamScheduleUncheckedUpdateManyWithoutProjectInput>
  }

  export type ExamScheduleScalarWhereInput = {
    AND?: ExamScheduleScalarWhereInput | ExamScheduleScalarWhereInput[]
    OR?: ExamScheduleScalarWhereInput[]
    NOT?: ExamScheduleScalarWhereInput | ExamScheduleScalarWhereInput[]
    id?: IntFilter<"ExamSchedule"> | number
    projectId?: IntFilter<"ExamSchedule"> | number
    type?: StringFilter<"ExamSchedule"> | string
    examDate?: DateTimeNullableFilter<"ExamSchedule"> | Date | string | null
    startTime?: StringNullableFilter<"ExamSchedule"> | string | null
    endTime?: StringNullableFilter<"ExamSchedule"> | string | null
    location?: StringNullableFilter<"ExamSchedule"> | string | null
    status?: StringFilter<"ExamSchedule"> | string
    createdAt?: DateTimeFilter<"ExamSchedule"> | Date | string
    updatedAt?: DateTimeFilter<"ExamSchedule"> | Date | string
  }

  export type ProjectActivityUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectActivityWhereUniqueInput
    update: XOR<ProjectActivityUpdateWithoutProjectInput, ProjectActivityUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectActivityCreateWithoutProjectInput, ProjectActivityUncheckedCreateWithoutProjectInput>
  }

  export type ProjectActivityUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectActivityWhereUniqueInput
    data: XOR<ProjectActivityUpdateWithoutProjectInput, ProjectActivityUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectActivityUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectActivityScalarWhereInput
    data: XOR<ProjectActivityUpdateManyMutationInput, ProjectActivityUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectActivityScalarWhereInput = {
    AND?: ProjectActivityScalarWhereInput | ProjectActivityScalarWhereInput[]
    OR?: ProjectActivityScalarWhereInput[]
    NOT?: ProjectActivityScalarWhereInput | ProjectActivityScalarWhereInput[]
    id?: IntFilter<"ProjectActivity"> | number
    projectId?: IntFilter<"ProjectActivity"> | number
    type?: StringFilter<"ProjectActivity"> | string
    title?: StringFilter<"ProjectActivity"> | string
    description?: StringNullableFilter<"ProjectActivity"> | string | null
    status?: StringNullableFilter<"ProjectActivity"> | string | null
    icon?: StringNullableFilter<"ProjectActivity"> | string | null
    actorName?: StringNullableFilter<"ProjectActivity"> | string | null
    createdAt?: DateTimeFilter<"ProjectActivity"> | Date | string
  }

  export type ProjectStepStatusUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectStepStatusWhereUniqueInput
    update: XOR<ProjectStepStatusUpdateWithoutProjectInput, ProjectStepStatusUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectStepStatusCreateWithoutProjectInput, ProjectStepStatusUncheckedCreateWithoutProjectInput>
  }

  export type ProjectStepStatusUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectStepStatusWhereUniqueInput
    data: XOR<ProjectStepStatusUpdateWithoutProjectInput, ProjectStepStatusUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectStepStatusUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectStepStatusScalarWhereInput
    data: XOR<ProjectStepStatusUpdateManyMutationInput, ProjectStepStatusUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectCreateWithoutStepStatusesInput = {
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student1: UserCreateNestedOneWithoutProjects1Input
    student2?: UserCreateNestedOneWithoutProjects2Input
    advisor?: UserCreateNestedOneWithoutAdvisedProjectsInput
    coAdvisor?: UserCreateNestedOneWithoutCoAdvisedProjectsInput
    reports?: ProgressReportCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutStepStatusesInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ProgressReportUncheckedCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleUncheckedCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutStepStatusesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutStepStatusesInput, ProjectUncheckedCreateWithoutStepStatusesInput>
  }

  export type AdminCreateWithoutApprovedStepsInput = {
    username: string
    password: string
    fullname?: string | null
    email: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUncheckedCreateWithoutApprovedStepsInput = {
    id?: number
    username: string
    password: string
    fullname?: string | null
    email: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminCreateOrConnectWithoutApprovedStepsInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutApprovedStepsInput, AdminUncheckedCreateWithoutApprovedStepsInput>
  }

  export type ProjectUpsertWithoutStepStatusesInput = {
    update: XOR<ProjectUpdateWithoutStepStatusesInput, ProjectUncheckedUpdateWithoutStepStatusesInput>
    create: XOR<ProjectCreateWithoutStepStatusesInput, ProjectUncheckedCreateWithoutStepStatusesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutStepStatusesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutStepStatusesInput, ProjectUncheckedUpdateWithoutStepStatusesInput>
  }

  export type ProjectUpdateWithoutStepStatusesInput = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student1?: UserUpdateOneRequiredWithoutProjects1NestedInput
    student2?: UserUpdateOneWithoutProjects2NestedInput
    advisor?: UserUpdateOneWithoutAdvisedProjectsNestedInput
    coAdvisor?: UserUpdateOneWithoutCoAdvisedProjectsNestedInput
    reports?: ProgressReportUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutStepStatusesInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ProgressReportUncheckedUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUncheckedUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type AdminUpsertWithoutApprovedStepsInput = {
    update: XOR<AdminUpdateWithoutApprovedStepsInput, AdminUncheckedUpdateWithoutApprovedStepsInput>
    create: XOR<AdminCreateWithoutApprovedStepsInput, AdminUncheckedCreateWithoutApprovedStepsInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutApprovedStepsInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutApprovedStepsInput, AdminUncheckedUpdateWithoutApprovedStepsInput>
  }

  export type AdminUpdateWithoutApprovedStepsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateWithoutApprovedStepsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateWithoutActivitiesInput = {
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student1: UserCreateNestedOneWithoutProjects1Input
    student2?: UserCreateNestedOneWithoutProjects2Input
    advisor?: UserCreateNestedOneWithoutAdvisedProjectsInput
    coAdvisor?: UserCreateNestedOneWithoutCoAdvisedProjectsInput
    reports?: ProgressReportCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutActivitiesInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ProgressReportUncheckedCreateNestedManyWithoutProjectInput
    exams?: ExamScheduleUncheckedCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutActivitiesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutActivitiesInput, ProjectUncheckedCreateWithoutActivitiesInput>
  }

  export type ProjectUpsertWithoutActivitiesInput = {
    update: XOR<ProjectUpdateWithoutActivitiesInput, ProjectUncheckedUpdateWithoutActivitiesInput>
    create: XOR<ProjectCreateWithoutActivitiesInput, ProjectUncheckedCreateWithoutActivitiesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutActivitiesInput, ProjectUncheckedUpdateWithoutActivitiesInput>
  }

  export type ProjectUpdateWithoutActivitiesInput = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student1?: UserUpdateOneRequiredWithoutProjects1NestedInput
    student2?: UserUpdateOneWithoutProjects2NestedInput
    advisor?: UserUpdateOneWithoutAdvisedProjectsNestedInput
    coAdvisor?: UserUpdateOneWithoutCoAdvisedProjectsNestedInput
    reports?: ProgressReportUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ProgressReportUncheckedUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUncheckedUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutReportsInput = {
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student1: UserCreateNestedOneWithoutProjects1Input
    student2?: UserCreateNestedOneWithoutProjects2Input
    advisor?: UserCreateNestedOneWithoutAdvisedProjectsInput
    coAdvisor?: UserCreateNestedOneWithoutCoAdvisedProjectsInput
    exams?: ExamScheduleCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutReportsInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exams?: ExamScheduleUncheckedCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityUncheckedCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutReportsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutReportsInput, ProjectUncheckedCreateWithoutReportsInput>
  }

  export type ProjectUpsertWithoutReportsInput = {
    update: XOR<ProjectUpdateWithoutReportsInput, ProjectUncheckedUpdateWithoutReportsInput>
    create: XOR<ProjectCreateWithoutReportsInput, ProjectUncheckedCreateWithoutReportsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutReportsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutReportsInput, ProjectUncheckedUpdateWithoutReportsInput>
  }

  export type ProjectUpdateWithoutReportsInput = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student1?: UserUpdateOneRequiredWithoutProjects1NestedInput
    student2?: UserUpdateOneWithoutProjects2NestedInput
    advisor?: UserUpdateOneWithoutAdvisedProjectsNestedInput
    coAdvisor?: UserUpdateOneWithoutCoAdvisedProjectsNestedInput
    exams?: ExamScheduleUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutReportsInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exams?: ExamScheduleUncheckedUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUncheckedUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutExamsInput = {
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student1: UserCreateNestedOneWithoutProjects1Input
    student2?: UserCreateNestedOneWithoutProjects2Input
    advisor?: UserCreateNestedOneWithoutAdvisedProjectsInput
    coAdvisor?: UserCreateNestedOneWithoutCoAdvisedProjectsInput
    reports?: ProgressReportCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutExamsInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ProgressReportUncheckedCreateNestedManyWithoutProjectInput
    activities?: ProjectActivityUncheckedCreateNestedManyWithoutProjectInput
    stepStatuses?: ProjectStepStatusUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutExamsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutExamsInput, ProjectUncheckedCreateWithoutExamsInput>
  }

  export type ProjectUpsertWithoutExamsInput = {
    update: XOR<ProjectUpdateWithoutExamsInput, ProjectUncheckedUpdateWithoutExamsInput>
    create: XOR<ProjectCreateWithoutExamsInput, ProjectUncheckedCreateWithoutExamsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutExamsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutExamsInput, ProjectUncheckedUpdateWithoutExamsInput>
  }

  export type ProjectUpdateWithoutExamsInput = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student1?: UserUpdateOneRequiredWithoutProjects1NestedInput
    student2?: UserUpdateOneWithoutProjects2NestedInput
    advisor?: UserUpdateOneWithoutAdvisedProjectsNestedInput
    coAdvisor?: UserUpdateOneWithoutCoAdvisedProjectsNestedInput
    reports?: ProgressReportUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutExamsInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ProgressReportUncheckedUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUncheckedUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyStudent1Input = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student2Id?: number | null
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyStudent2Input = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    advisorId?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyAdvisorInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    coAdvisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectCreateManyCoAdvisorInput = {
    id?: number
    titleTh: string
    titleEn?: string | null
    semester?: string | null
    academicYear?: string | null
    step?: number
    status?: string
    feedback?: string | null
    thesisUrl?: string | null
    programUrl?: string | null
    manualUrl?: string | null
    student1Id: number
    student2Id?: number | null
    advisorId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateWithoutStudent1Input = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student2?: UserUpdateOneWithoutProjects2NestedInput
    advisor?: UserUpdateOneWithoutAdvisedProjectsNestedInput
    coAdvisor?: UserUpdateOneWithoutCoAdvisedProjectsNestedInput
    reports?: ProgressReportUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutStudent1Input = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ProgressReportUncheckedUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUncheckedUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUncheckedUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutStudent1Input = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutStudent2Input = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student1?: UserUpdateOneRequiredWithoutProjects1NestedInput
    advisor?: UserUpdateOneWithoutAdvisedProjectsNestedInput
    coAdvisor?: UserUpdateOneWithoutCoAdvisedProjectsNestedInput
    reports?: ProgressReportUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutStudent2Input = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ProgressReportUncheckedUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUncheckedUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUncheckedUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutStudent2Input = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutAdvisorInput = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student1?: UserUpdateOneRequiredWithoutProjects1NestedInput
    student2?: UserUpdateOneWithoutProjects2NestedInput
    coAdvisor?: UserUpdateOneWithoutCoAdvisedProjectsNestedInput
    reports?: ProgressReportUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutAdvisorInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ProgressReportUncheckedUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUncheckedUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUncheckedUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutAdvisorInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    coAdvisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutCoAdvisorInput = {
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student1?: UserUpdateOneRequiredWithoutProjects1NestedInput
    student2?: UserUpdateOneWithoutProjects2NestedInput
    advisor?: UserUpdateOneWithoutAdvisedProjectsNestedInput
    reports?: ProgressReportUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutCoAdvisorInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ProgressReportUncheckedUpdateManyWithoutProjectNestedInput
    exams?: ExamScheduleUncheckedUpdateManyWithoutProjectNestedInput
    activities?: ProjectActivityUncheckedUpdateManyWithoutProjectNestedInput
    stepStatuses?: ProjectStepStatusUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutCoAdvisorInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleTh?: StringFieldUpdateOperationsInput | string
    titleEn?: NullableStringFieldUpdateOperationsInput | string | null
    semester?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableStringFieldUpdateOperationsInput | string | null
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    thesisUrl?: NullableStringFieldUpdateOperationsInput | string | null
    programUrl?: NullableStringFieldUpdateOperationsInput | string | null
    manualUrl?: NullableStringFieldUpdateOperationsInput | string | null
    student1Id?: IntFieldUpdateOperationsInput | number
    student2Id?: NullableIntFieldUpdateOperationsInput | number | null
    advisorId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStepStatusCreateManyApprovedByInput = {
    id?: number
    projectId: number
    step: number
    status?: string
    feedback?: string | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ProjectStepStatusUpdateWithoutApprovedByInput = {
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutStepStatusesNestedInput
  }

  export type ProjectStepStatusUncheckedUpdateWithoutApprovedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStepStatusUncheckedUpdateManyWithoutApprovedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressReportCreateManyProjectInput = {
    id?: number
    title: string
    description?: string | null
    fileUrl?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExamScheduleCreateManyProjectInput = {
    id?: number
    type: string
    examDate?: Date | string | null
    startTime?: string | null
    endTime?: string | null
    location?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectActivityCreateManyProjectInput = {
    id?: number
    type: string
    title: string
    description?: string | null
    status?: string | null
    icon?: string | null
    actorName?: string | null
    createdAt?: Date | string
  }

  export type ProjectStepStatusCreateManyProjectInput = {
    id?: number
    step: number
    status?: string
    feedback?: string | null
    approvedById?: number | null
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type ProgressReportUpdateWithoutProjectInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressReportUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgressReportUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamScheduleUpdateWithoutProjectInput = {
    type?: StringFieldUpdateOperationsInput | string
    examDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamScheduleUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    examDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExamScheduleUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    examDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectActivityUpdateWithoutProjectInput = {
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectActivityUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectActivityUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStepStatusUpdateWithoutProjectInput = {
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: AdminUpdateOneWithoutApprovedStepsNestedInput
  }

  export type ProjectStepStatusUncheckedUpdateWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectStepStatusUncheckedUpdateManyWithoutProjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    step?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    feedback?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}