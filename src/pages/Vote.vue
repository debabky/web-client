<template>
  <div class="vote">
    <div class="vote__list-wrp">
      <h4 class="vote__title">
        {{ $t('vote.selected-part-title') }}
      </h4>
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

    <qr-auth-modal :is-shown="isModalShown" />

    <app-button
      class="vote__btn"
      :text="$t('vote.vote-btn-txt')"
      :disabled="!isSelectedAll"
      @click="vote"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { VoteOption, VotePayload } from '@/types'
import { AppButton, Optionitem, QrAuthModal } from '@/common'
import { ErrorHandler, getVotingById, getVotingList } from '@/helpers'

const props = defineProps<{
  id: string | number
}>()

const options = [
  {
    id: 'DeBabky',
    type: 'voting_options',
    attributes: {
      name: 'DeBaite bky',
      voting_id: 'b9a1c722-f771-4b1a-b293-7bf90a4d55fa',
    },
  },
  {
    id: '5656',
    type: 'voting_options',
    attributes: {
      name: 'DeBabky',
      voting_id: 'b9a1c722-f771-4b1a-b293-7bf90a4d55fa',
    },
  },
  {
    id: '55',
    type: 'voting_options',
    attributes: {
      name: 'DeBabky',
      voting_id: 'b9a1c722-f771-4b1a-b293-7bf90a4d55fa',
    },
  },
  {
    id: 'De5555Babky',
    type: 'voting_options',
    attributes: {
      name: 'DeBabky',
      voting_id: 'b9a1c722-f771-4b1a-b293-7bf90a4d55fa',
    },
  },
  {
    id: '421',
    type: 'voting_options',
    attributes: {
      name: 'DeBabky',
      voting_id: 'b9a1c722-f771-4b1a-b293-7bf90a4d55fa',
    },
  },
  {
    id: '123',
    type: 'voting_options',
    attributes: {
      name: 'DeBabky',
      voting_id: 'b9a1c722-f771-4b1a-b293-7bf90a4d55fa',
    },
  },
]

const items = ref<
  {
    item: VoteOption
    isSelected: boolean
  }[]
>([])

const isModalShown = ref(false)
const selectedList = ref<VoteOption[]>([])

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
    const data = selectedList.value.map(
      (vote, id) => ({ votingOption: vote.id, rank: id } as VotePayload),
    )

    console.log(data.toString())
    const dataJson = JSON.parse(data.toString())

    // await postVote(data)
  } catch (error) {
    ErrorHandler.process(error)
  }
}
const init = async () => {
  const { data } = await getVotingById(props.id)

  items.value = options.map(option => ({
    item: option,
    isSelected: false,
    id: -1,
  }))
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
</style>
