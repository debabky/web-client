<template>
  <div class="home-page">
    <h1 class="home-page__title">
      {{ $t('home.title') }}
    </h1>

    <div class="home-page__list" v-if="votings.length">
      <vote-card-list :payload="votings" @select="select" />
    </div>
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
  router.push({
    name: ROUTE_NAMES.vote,
    params: { id: vote.id },
  })
}

const init = async () => {
  const { data } = await getVotingList()

  votings.value = data
}

init()
</script>

<style scoped lang="scss">
.home-page {
  margin: 0 auto;
}

.home-page__title {
  text-align: center;
  margin-bottom: toRem(16);
}

.home-page__list {
  margin: auto;
}
</style>
