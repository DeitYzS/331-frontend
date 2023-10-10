<script setup lang="ts">
import OrganizerCard from '@/components/OrganizerCard.vue'
import type { OrganizerItem } from '@/type'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'
import OrganizerService from '@/services/OrganizerService'
import NProgress from 'nprogress'

import { useRouter } from 'vue-router'
const organizers: Ref<OrganizerItem[]> = ref([])
const totalEvent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const router = useRouter()

OrganizerService.getOrganizers(3, props.page)
    .then((response: AxiosResponse<OrganizerItem[]>) => {
      organizers.value = response.data
      totalEvent.value =
          response.headers['x-total-count']
      console.log(response.data)
    })
    .catch(() => {
      router.push({ name: 'network-error' })
    })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  OrganizerService.getOrganizers(3, toPage)
      .then((response: AxiosResponse<OrganizerItem[]>) => {
        organizers.value = response.data
        totalEvent.value = response.headers['x-total-count']
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
})
const hasNextPage = computed(() => {
  // first calculate the total page
  const totalPages = Math.ceil(totalEvent.value / 2)
  return props.page.valueOf() < totalPages
})
</script>

<template>
  <h1>Organization</h1>
  <main class="flex flex-col items-center">
    <OrganizerCard v-for="organizer in organizers" :key="organizer.id" :organizer="organizer"></OrganizerCard>

    <div class="pagination">
      <RouterLink
          :to="{ name: 'organizer-list', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          id="page-prev"
      >
        Prev Page
      </RouterLink>

      <RouterLink
          :to="{ name: 'organizer-list', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          id="page-next"
      >
        Next Page
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>


.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
