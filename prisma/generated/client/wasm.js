
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AdminScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  password: 'password',
  fullname: 'fullname',
  role: 'role'
};

exports.Prisma.UserScalarFieldEnum = {
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
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  titleTh: 'titleTh',
  titleEn: 'titleEn',
  description: 'description',
  semester: 'semester',
  academicYear: 'academicYear',
  step: 'step',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  student1Id: 'student1Id',
  student2Id: 'student2Id',
  advisorId: 'advisorId',
  coAdvisorId: 'coAdvisorId'
};

exports.Prisma.ProjectActivityScalarFieldEnum = {
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

exports.Prisma.ProjectStepStatusScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  step: 'step',
  status: 'status',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProgressReportScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  title: 'title',
  description: 'description',
  fileUrl: 'fileUrl',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExamScheduleScalarFieldEnum = {
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

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Admin: 'Admin',
  User: 'User',
  Project: 'Project',
  ProjectActivity: 'ProjectActivity',
  ProjectStepStatus: 'ProjectStepStatus',
  ProgressReport: 'ProgressReport',
  ExamSchedule: 'ExamSchedule'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\Projects-end\\pro-end2\\prisma\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "D:\\Projects-end\\pro-end2\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../..",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"./generated/client\"\n  previewFeatures = [\"driverAdapters\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Admin {\n  id       Int     @id @default(autoincrement())\n  username String  @unique\n  email    String  @unique\n  password String\n  fullname String?\n  role     String  @default(\"admin\")\n}\n\nmodel User {\n  id               Int      @id @default(autoincrement())\n  username         String   @unique\n  email            String   @unique\n  password         String\n  fullname         String?\n  academicYear     String?\n  tel              String?\n  lineId           String?\n  profileImage     String?\n  role             String   @default(\"student\") // student, teacher\n  isApproved       Boolean  @default(false)\n  addressNo        String?\n  moo              String?\n  soi              String?\n  road             String?\n  subdistrict      String?\n  district         String?\n  province         String?\n  zipcode          String?\n  homePhone        String?\n  emergencyContact String?\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n\n  // Relations\n  projects1 Project[] @relation(\"Student1\")\n  projects2 Project[] @relation(\"Student2\")\n  advisor   Project[] @relation(\"Advisor\")\n  coAdvisor Project[] @relation(\"CoAdvisor\")\n}\n\nmodel Project {\n  id           Int      @id @default(autoincrement())\n  titleTh      String\n  titleEn      String?\n  description  String?\n  semester     String?\n  academicYear String?\n  step         Int      @default(1)\n  status       String   @default(\"pending\")\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  // Relations\n  student1Id Int\n  student1   User @relation(\"Student1\", fields: [student1Id], references: [id])\n\n  student2Id Int?\n  student2   User? @relation(\"Student2\", fields: [student2Id], references: [id])\n\n  advisorId Int?\n  advisor   User? @relation(\"Advisor\", fields: [advisorId], references: [id])\n\n  coAdvisorId Int?\n  coAdvisor   User? @relation(\"CoAdvisor\", fields: [coAdvisorId], references: [id])\n\n  activities ProjectActivity[]\n  stepStatus ProjectStepStatus[]\n  reports    ProgressReport[]\n  exams      ExamSchedule[]\n}\n\nmodel ProjectActivity {\n  id          Int      @id @default(autoincrement())\n  projectId   Int\n  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)\n  type        String\n  title       String\n  description String?\n  status      String?\n  icon        String?\n  actorName   String?\n  createdAt   DateTime @default(now())\n}\n\nmodel ProjectStepStatus {\n  id        Int      @id @default(autoincrement())\n  projectId Int\n  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)\n  step      Int\n  status    String   @default(\"pending\")\n  updatedAt DateTime @updatedAt\n\n  @@unique([projectId, step])\n}\n\nmodel ProgressReport {\n  id          Int      @id @default(autoincrement())\n  projectId   Int\n  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)\n  title       String\n  description String?\n  fileUrl     String?\n  status      String   @default(\"pending\")\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nmodel ExamSchedule {\n  id        Int       @id @default(autoincrement())\n  projectId Int\n  project   Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)\n  type      String // TOPIC, PROGRESS, FINAL\n  examDate  DateTime?\n  startTime String?\n  endTime   String?\n  location  String?\n  status    String    @default(\"scheduled\")\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n}\n",
  "inlineSchemaHash": "f6dc9c6e4a5f132855e18754a8839c8bf97289bcba5511c6b1b6699107ae06cb",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Admin\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fullname\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fullname\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"academicYear\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lineId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"profileImage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isApproved\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"addressNo\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"moo\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"soi\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"road\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"subdistrict\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"district\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"province\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"zipcode\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"homePhone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emergencyContact\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"projects1\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"Student1\"},{\"name\":\"projects2\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"Student2\"},{\"name\":\"advisor\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"Advisor\"},{\"name\":\"coAdvisor\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"CoAdvisor\"}],\"dbName\":null},\"Project\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"titleTh\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"titleEn\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"semester\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"academicYear\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"step\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"student1Id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"student1\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"Student1\"},{\"name\":\"student2Id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"student2\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"Student2\"},{\"name\":\"advisorId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"advisor\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"Advisor\"},{\"name\":\"coAdvisorId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"coAdvisor\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CoAdvisor\"},{\"name\":\"activities\",\"kind\":\"object\",\"type\":\"ProjectActivity\",\"relationName\":\"ProjectToProjectActivity\"},{\"name\":\"stepStatus\",\"kind\":\"object\",\"type\":\"ProjectStepStatus\",\"relationName\":\"ProjectToProjectStepStatus\"},{\"name\":\"reports\",\"kind\":\"object\",\"type\":\"ProgressReport\",\"relationName\":\"ProgressReportToProject\"},{\"name\":\"exams\",\"kind\":\"object\",\"type\":\"ExamSchedule\",\"relationName\":\"ExamScheduleToProject\"}],\"dbName\":null},\"ProjectActivity\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"projectId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"project\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"ProjectToProjectActivity\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"actorName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ProjectStepStatus\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"projectId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"project\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"ProjectToProjectStepStatus\"},{\"name\":\"step\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ProgressReport\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"projectId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"project\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"ProgressReportToProject\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fileUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ExamSchedule\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"projectId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"project\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"ExamScheduleToProject\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"examDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"startTime\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"endTime\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

