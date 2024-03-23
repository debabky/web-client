<template>
  <div v-for="vote in payload" :key="vote">
    <vote-item />
  </div>
</template>

<script setup lang="ts">
import { VoteItem } from '@/common'

defineProps<{
  payload: []
}>()
</script>

<style scoped lang="scss"></style>
