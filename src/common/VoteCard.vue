<template>
  <div class="vote-item">
    <div v-for="field in payload" class="vote-card__payload" :key="field.lbl">
      <p>{{ field.lbl }}</p>
      <p>{{ field.value }}</p>
    </div>

    <app-button :text="$t('vote-card.select-btn-txt')" @click="select" />
  </div>
</template>

<script setup lang="ts">
import { Voting } from '@/types'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import AppButton from '@/common/AppButton.vue'

const emit = defineEmits<{
  (e: 'select', value: Voting): void
}>()

const props = defineProps<{
  voting: Voting
}>()

const { t } = useI18n()

const payload = computed(() => [
  {
    lbl: t('vote-card.name-lbl'),
    value: props.voting?.name ?? '',
  },
  {
    lbl: t('vote-card.created-at-lbl'),
    value: props.voting?.createdAt ?? '',
  },
  {
    lbl: t('vote-card.active-until-lbl'),
    value: props.voting?.activeUntil ?? '',
  },
])

const select = () => {
  emit('select', props.voting)
}
</script>

<style scoped lang="scss">
.vote-item {
  padding: toRem(16);
  display: grid;
  border-radius: solid toRem(1) var(--background-primary-main);
}

.vote-card__payload {
  display: grid;
}
</style>
