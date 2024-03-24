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

      <div class="vote__list">
        <template v-for="option in selectedList" :key="option.id">
          <optionitem
            class="vote__option"
            :item="option"
            @toggle-state="toggleItem"
          />
        </template>
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

    <qr-auth-modal v-model:is-shown="isModalShown" :nonce="nonce" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { VoteOptions, Voting } from '@/types'
import { AppButton, Optionitem, QrAuthModal } from '@/common'
import { auth, ErrorHandler, getVotingById, postVote, sleep } from '@/helpers'
import { poseidon } from '@big-whale-labs/poseidon'
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

const isModalShown = ref(false)
const selectedList = ref<VoteOptions[]>([])
const nonce = ref('2a7dc999-5967-415e-ab49-50e32ec6ec15')

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
    const data = selectedList.value.map(vote => ({
      votingOption: vote.attributes.name,
    }))

    const ids = selectedList.value.map(item => item.attributes.id)

    const hash = poseidon(ids)
    const authResp = await validate()

    await postVote(
      data,
      'Bearer ' + authResp?.data?.accessToken?.token ?? 'test',
    )
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

  // nonce.value = uuidv4()

  items.value = list
}

init()
</script>

<style scoped lang="scss">
.vote__list {
  display: grid;
  grid-template-columns: repeat(4, minmax(toRem(100), 1fr));
  gap: toRem(30);
  margin-bottom: toRem(50);
  background: var(--background-primary-dark);
  padding: toRem(32);
  border-radius: toRem(16);
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
