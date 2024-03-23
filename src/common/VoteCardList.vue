<template>
  <div class="vote-card-list">
      <vote-card  v-for="vote in payload" :key="vote" :vote="vote"/>
  </div>

</template>

<script setup lang="ts">
import { VoteCard } from '@/common'

defineProps<{
  payload: []
}>()
</script>

<style scoped lang="scss">
 .vote-card-list{
   display: grid;
   grid-template-columns: repeat(4, minmax(toRem(100),  1fr));
 }
</style>
