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
import { ref, watch } from 'vue'

const props = defineProps<{
  isShown: boolean
  nonce: string
  options: { votingOption: number; rank: number }[]
  votingId: string
}>()

const qr = ref('')
const genQr = async (text: string) =>
  QRCode.toDataURL(text, {
    color: {
      dark: '#B388EB',
      light: '#FFD2F9',
    },
  })

const init = async () => {
  qr.value = await genQr(
    JSON.stringify({
      session_uuid: props.nonce,
      voting_id: props.votingId,
      options: props.options,
    }),
  )
}

watch(props, init)
</script>

<style scoped lang="scss">
.qr-auth-modal__pane {
  display: grid;
  width: 100%;
  height: 100%;
  max-width: toRem(500);
  max-height: toRem(500);
  background: var(--background-primary-dark);
  border-radius: toRem(24);
}

.qr-auth-modal__img {
  margin: auto;
  width: 50%;
}
</style>
