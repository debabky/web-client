<template>
  <div class="option-item">
    <p>{{ item.id }}</p>
    <app-button :text="$t('option-item.toggle-btn-txt')" @click="toggle" />
  </div>
</template>

<script setup lang="ts">
import { VoteOption } from '@/types'
import { AppButton } from '@/common'

const emit = defineEmits<{
  (e: 'toggle-state', id: string | number): void
}>()

const props = defineProps<{
  item: VoteOption
}>()

const toggle = () => {
  emit('toggle-state', props.item.id)
}
</script>

<style scoped lang="scss">
.option-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: toRem(16);
  border-radius: toRem(16);
  background: var(--background-secondary-main);
}
</style>
