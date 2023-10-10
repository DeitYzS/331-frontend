<script setup lang="ts">
import { type OrganizerItem } from '@/type'
import type { PropType } from 'vue'

defineProps({
  organizer: {
    type: Object as PropType<OrganizerItem>,
    require: true
  }
})
</script>
<template>

  <div v-if="organizer">
    <p>{{ organizer.id }}</p>
    <p>{{ organizer.name }}</p>
<!--    <p>{{ organizer.address }}</p>-->
  <div class=" flex flex-row flex-wrap justify-center">
      <img 
        v-for="image in organizer.images"
        :key="image"
        :src="image"
        alt="organizer image"
        class=" border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
      />
    </div>
  </div>
</template>
