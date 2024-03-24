<template>
  <div class="vote-card-list">
    <vote-card
      v-for="vote in payload"
      :key="vote.name"
      :voting="vote"
      @select="select"
    />
  </div>
</template>

<script setup lang="ts">
import { VoteCard } from '@/common'
import { Voting } from '@/types'

const emit = defineEmits<{
  (e: 'select', value: Voting): void
}>()

defineProps<{
  payload: Voting[]
}>()

const select = (vote: Voting) => {
  emit('select', vote)
}
</script>

<style scoped lang="scss">
.vote-card-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(toRem(100), 1fr));
}
</style>
