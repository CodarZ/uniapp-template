import { defineStore } from 'pinia'

const initUserInfo = {
  id: '',
  avatar: '',
  userName: '',
  nickName: '',
}
function userStoreSetup() {
  const userInfo = ref(initUserInfo)

  function clearUserInfo() {
    userInfo.value = { ...initUserInfo }
  }

  function setUserInfo(val: any) {
    userInfo.value = { ...val }
  }

  return {
    userInfo,

    setUserInfo,
    clearUserInfo,
  }
}

export const useUserStore = defineStore('user', userStoreSetup, {
  persist: true,
})
