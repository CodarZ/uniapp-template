<script setup lang="ts">
import { useToast } from 'wot-design-uni'

const title = ref('Hello')
const toast = useToast()

async function onClick() {
  try {
    console.log('请求方法')
  } catch (error: any) {
    toast.error(error.message)
  }
}
</script>

<template>
  <DefaultLayout>
    <view class="content">
      <wd-button @click="onClick"> 点击 </wd-button>
      <image class="logo" src="/static/logo.png" />
      <view class="text-area">
        <text class="title test">
          {{ title }}
        </text>
      </view>
    </view>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200px;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;

  .content {
    display: block;
    flex: 1;
    flex-direction: column;
  }
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
