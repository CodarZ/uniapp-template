import type { GenerateServiceProps } from 'openapi-ts-request'

export default [
  {
    schemaPath: 'http://localhost:8000/openapi.json',
    serversPath: './src/apis/auto/local',
    requestLibPath: `import request from '@/utils/request';\n`,
    apiPrefix: '"/api"',
  },
] as GenerateServiceProps[]
