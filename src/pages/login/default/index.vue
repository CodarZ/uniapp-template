<script setup lang="ts">
const redirectURL = ref('/pages/index/index')

onLoad((query = {}) => {
  const { redirect = '' } = query
  redirectURL.value = redirect
})

function login() {
  uni.redirectTo({
    url: redirectURL.value,
  })
}
</script>

<template>
  <DefaultLayout>
    <view>
      <button @click="login"> 登录 </button>
    </view>
  </DefaultLayout>
</template>

<style></style>
