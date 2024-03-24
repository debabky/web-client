<template>
  <div class="vote-item">
    <div v-for="field in payload" class="vote-card__payload" :key="field.lbl">
      <p class="vote-item__lbl">
        {{ field.lbl }}
      </p>
      <p class="vote-item__value">
        {{ field.value }}
      </p>
    </div>

    <app-button
      class="vote-card__btn"
      :text="$t('vote-card.select-btn-txt')"
      @click="select"
    />
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
  border-radius: toRem(16);
  border: solid toRem(3) var(--background-primary-dark);
}

.vote-card__payload {
  display: grid;
}

.vote-card__btn {
  margin: toRem(16) auto;
  width: 100%;
}

.vote-item__lbl {
  color: var(--text-primary-light);
}

.vote-item__value {
  color: var(--text-secondary-invert-dark);
}
</style>
