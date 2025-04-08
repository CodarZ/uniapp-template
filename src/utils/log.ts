import { getCurrentPage } from './page'
import { isMpWeixin } from './platform'

const logManager = isMpWeixin ? wx.getLogManager({ level: 1 }) : null // log info warn debug
const realtimeLogManager = isMpWeixin ? wx.getRealtimeLogManager() : null // info warn error

/** 日志转为字符串存储 */
function formatLog(notRealtime: boolean, ...args: any[]): string {
  const currentPath = notRealtime ? getCurrentPage()?.route || 'App' : ''

  return ` ${currentPath} | ${args.map((a) => JSON.stringify(a)).join(' ')}`
}

function _log(type: 'error' | 'warn' | 'info', ...args: any[]) {
  const logStr = formatLog(true, ...args)
  const realtimeLog = formatLog(false, ...args)

  // 始终在 console 输出
  if (type === 'info') {
    console.log('%cInfo', 'background-color:#0052d9;border-radius:4px;padding:0 4px', ...args)
  } else if (type === 'warn') {
    console.log('%cWarn', 'background-color:#ff7d00;border-radius:4px;padding:0 4px', ...args)
  } else if (type === 'error') {
    console.error(...args)
  }

  // 仅在微信环境中调用 logManager 和 realtimeLogManager
  if (isMpWeixin && logManager && realtimeLogManager) {
    if (type === 'info') {
      logManager.info(logStr)
    } else if (type === 'warn') {
      logManager.warn(logStr)
      realtimeLogManager.warn(realtimeLog)
    } else if (type === 'error') {
      logManager.debug(logStr)
      realtimeLogManager.error(realtimeLog)
    }
  }
}

function INFO(...args: any[]): void {
  _log('info', ...args)
}
function WARN(...args: any[]): void {
  _log('warn', ...args)
}
function ERROR(...args: any[]): void {
  _log('error', ...args)
}

export const Log = {
  INFO,
  WARN,
  ERROR,
}

export default Log
