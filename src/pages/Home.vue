<template>
  <div class="home-page">
    <template v-if="list.length">
      <vote-list :payload="list" />
    </template>
    <qr-auth-modal :is-shown="isModalShown" />
  </div>
</template>

<script setup lang="ts">
import { VoteList, QrAuthModal } from '@/common'
import { ref } from 'vue'

const list = ref<[]>([])
const isModalShown = ref(false)
</script>

<style scoped lang="scss"></style>
