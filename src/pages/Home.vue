<template>
  <div class="home-page">
    <template v-if="list.length">
      <vote-card-list :payload="list" />
    </template>
    <qr-auth-modal :is-shown="isModalShown" />
  </div>
</template>

<script setup lang="ts">
import { VoteCardList, QrAuthModal } from '@/common'
import { ref } from 'vue'
import { getVotingList } from '@/helpers/vote.helpers'

const list = ref<[]>([])
const isModalShown = ref(false)
const init = async () => {
  const data = await getVotingList()
  console.log(data)
}

init()
</script>

<style scoped lang="scss"></style>
