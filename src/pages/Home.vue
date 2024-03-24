<template>
  <div class="home-page">
    <template v-if="votings.length">
      <vote-card-list :payload="votings" @select="select" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { VoteCardList } from '@/common'
import { ref } from 'vue'
import { getVotingList } from '@/helpers/vote.helpers'
import { Voting } from '@/types'
import { router } from '@/router'
import { ROUTE_NAMES } from '@/enums'

const votings = ref<Voting[]>([])

const select = (vote: Voting) => {
  console.log(vote)
  router.push({
    name: ROUTE_NAMES.vote,
    params: { id: vote.id },
  })
}

const init = async () => {
  const { data } = await getVotingList()

  votings.value = data
  console.log(votings.value)
}

init()
</script>

<style scoped lang="scss"></style>
