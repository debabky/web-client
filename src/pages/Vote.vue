<template>
  <div class="vote">
    <div class="vote__list-wrp">
      <h4 class="vote__title">
        {{ $t('vote.selected-part-title') }}
      </h4>

      <div class="vote__voting-info">
        <div v-for="item in payload" :key="item.lbl">
          <p>{{ item.lbl }}</p>
          <p>{{ item.value }}</p>
        </div>
      </div>

      <div class="vote__list--wrp">
        <div class="vote__list--selected">
          <template v-for="place in laybels" :key="place">
            <p class="vote__selected-item">
              {{ place }}
            </p>
          </template>
        </div>

        <div class="vote__list--selected">
          <template v-for="option in selectedList" :key="option.id">
            <optionitem
              class="vote__option vote__selected-item"
              :item="option"
              @toggle-state="toggleItem"
            />
          </template>
        </div>
      </div>
    </div>

    <div class="vote__list-wrp">
      <h4 class="vote__title">
        {{ $t('vote.all-items-title') }}
      </h4>
      <div class="vote__list">
        <template v-for="option in items" :key="option.item.id">
          <optionitem
            v-if="!option.isSelected"
            class="vote__option"
            :item="option.item"
            @toggle-state="toggleItem"
          />
        </template>
      </div>
    </div>

    <app-button
      class="vote__btn"
      :text="$t('vote.vote-btn-txt')"
      :disabled="!isSelectedAll"
      @click="vote"
    />

    <qr-auth-modal
      v-model:is-shown="isModalShown"
      :nonce="nonce"
      :voting-id="votingInfo?.options[0]?.attributes.votingId ?? ''"
      :options="voteOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { VoteOptions, Voting } from '@/types'
import { AppButton, Optionitem, QrAuthModal } from '@/common'
import { auth, ErrorHandler, getVotingById, sleep } from '@/helpers'
import { useI18n } from 'vue-i18n'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  id: string | number
}>()

const { t } = useI18n()

const votingInfo = ref<Voting | null>(null)

const items = ref<
  {
    item: VoteOptions
    isSelected: boolean
  }[]
>([])

const voteOptions = ref<{ votingOption: number; rank: number }[]>([])
const isModalShown = ref(false)
const selectedList = ref<VoteOptions[]>([])
const nonce = ref('')
const payload = computed(() => [
  {
    lbl: t('vote-card.name-lbl'),
    value: votingInfo.value?.name ?? '',
  },
  {
    lbl: t('vote-card.created-at-lbl'),
    value: votingInfo.value?.createdAt ?? '',
  },
  {
    lbl: t('vote-card.active-until-lbl'),
    value: votingInfo.value?.activeUntil ?? '',
  },
])

const laybels = computed(() => [
  t('vote-card.first-place'),
  t('vote-card.second-place'),
  t('vote-card.third-place'),
])

const isSelectedAll = computed(
  () => items.value.length === selectedList.value.length,
)

const toggleItem = (id: string | number) => {
  const foundItem = items.value.find(obj => obj.item.id === id)
  if (!foundItem) {
    return
  }

  foundItem.isSelected = !foundItem.isSelected
  if (!foundItem.isSelected) {
    selectedList.value = selectedList.value.filter(option => option.id !== id)
    return
  }

  selectedList.value.push(foundItem.item)
}

const vote = async () => {
  isModalShown.value = true

  try {
    voteOptions.value = selectedList.value.map((vote, id) => ({
      votingOption: vote.attributes.id,
      rank: id + 1,
    }))

    await validate()
  } catch (error) {
    ErrorHandler.process(error)
  }
}

const validate = async () => {
  try {
    return auth(nonce.value)
  } catch (error) {
    await sleep(1000)
    await auth(nonce.value)
  }
}

const init = async () => {
  const { data } = await getVotingById(props.id)
  votingInfo.value = data

  const list = data.options.map(option => ({
    item: option,
    isSelected: false,
  }))

  nonce.value = uuidv4()

  items.value = list
}

init()
</script>

<style scoped lang="scss">
.vote {
  min-width: toRem(1280);
}

.vote__list {
  display: grid;
  grid-template-columns: repeat(4, minmax(toRem(100), 1fr));
  gap: toRem(30);
  margin-bottom: toRem(50);
  background: var(--background-primary-dark);
  padding: toRem(32);
  border-radius: toRem(16);

  &--selected {
    margin: toRem(25) 0;
    background: var(--background-primary-dark);
    padding: toRem(32);
    border-radius: toRem(16);
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: toRem(30);
  }
}

.vote__selected-item {
  min-height: toRem(50);
}

.vote__list--wrp {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: toRem(50);
}

.vote__option {
  width: 100%;
}

.vote__btn {
  max-width: toRem(150);
  width: 100%;
}

.vote__title {
  margin-bottom: toRem(16);
}

.vote__voting-info {
  display: grid;
  grid-template-columns: repeat(2, minmax(toRem(100), 1fr));
}
</style>
