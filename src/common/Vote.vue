<template>
  <div class="vote">
    <div class="vote__list--selected">
      <template v-for="option in selectedList" :key="option.id">
        <optionitem
          class="vote__option"
          :item="option"
          @toggle-state="toggleItem"
        />
      </template>
    </div>

    <div class="vote__list">
      <template v-for="option in items" :key="option.item.id">
        <optionitem
          v-if="!option.isSelected"
          class="vote__option"
          :item="option.item"
          @toggle-state="toggleItem"
        />
      </template>
      <div />
    </div>

    <app-button @click="vote" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VoteOption, VotePayload } from '@/types'
import {AppButton, Optionitem} from '@/common'
import { ErrorHandler, postVote } from '@/helpers'

const props = defineProps<{
  votingId: string | number
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

const selectedList = ref<VoteOption[]>([])

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
  try {
    const data = selectedList.value.map(
      (vote, id) => ({ votingOption: vote.id, rank: id } as VotePayload),
    )

    console.log(data.toString())
    const dataJson = JSON.parse(data.toString())

    await postVote(data)
  } catch (error) {
    ErrorHandler.process(error)
  }
}
const init = () => {
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
  display: flex;
  background: #7b6eff;

  &--selected {
    display: flex;
    background: #5cc56e;
  }
}

.vote__option {
  width: 100%;
  max-width: toRem(100);
}
</style>
