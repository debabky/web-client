<template>
  <modal :is-shown="isShown">
    <div class="qr-auth-modal__pane">
      <img class="qr-auth-modal__img" :src="qr" />
    </div>
  </modal>
</template>

<script setup lang="ts">
import * as QRCode from 'qrcode'
import { Modal } from '@/common'
import { v4 as uuid } from 'uuid'
import { ref } from 'vue'

defineProps<{
  isShown: boolean
}>()

const qr = ref('')
const genQr = async (text: string) => {
  return QRCode.toDataURL(text)
}

const init = async () => {
  const id = uuid()

  qr.value = await genQr(JSON.stringify({ nonce: id, url: '' }))
}

init()
</script>

<style scoped lang="scss">
.qr-auth-modal__pane {
  display: grid;
  width: 100%;
  height: 100%;
  max-width: toRem(500);
  max-height: toRem(500);
  background: var(--background-primary-main);
  border-radius: toRem(24);

  // padding: 3%; for mobile
}

.qr-auth-modal__img {
  margin: auto;
  width: 50%;
}
</style>
