/** 获取小程序环境信息，配置 URL 等参数 */

const { miniProgram } = uni.getAccountInfoSync() || {}
const { appId, envVersion, version } = miniProgram || {}

const ENV = {
  develop: {
    env: 'develop',
    envName: '开发版',
    SERVER_URL: 'https://dev.xxxxxxxx:8090',
  },
  trial: {
    env: 'trial',
    envName: '体验版',
    SERVER_URL: 'https://trial.xxxxxxxx:8080',
  },
  release: {
    env: 'release',
    envName: '正式版',
    SERVER_URL: 'https://release.xxxxxxxx:8080',
    version, // 只有正式版包含 `version`
  },
} as const

export const MiniProgramBaseENV = {
  appId,
  ...ENV[envVersion],
}
