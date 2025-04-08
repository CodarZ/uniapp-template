const TOKEN_KEY = 'token'

function isLogin() {
  return !!uni.getStorageSync(TOKEN_KEY)
}

function getToken(): string | undefined {
  return uni.getStorageSync(TOKEN_KEY)
}

function setToken(token: string) {
  uni.setStorageSync(TOKEN_KEY, token)
}

function clearToken() {
  uni.removeStorageSync(TOKEN_KEY)
}

export { clearToken, getToken, isLogin, setToken }
