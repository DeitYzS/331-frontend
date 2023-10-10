<script setup lang="ts">
import { useOrganizationStore } from '@/stores/organization'
import { storeToRefs } from 'pinia'
const store = useOrganizationStore()
const organizer = storeToRefs(store).organizer

</script>
<template>
  <div v-if="organizer">
    <h1>{{ organizer.name }}</h1>
    <div id="nav">
      <RouterLink :to="{ name: 'organizer-detail' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'organizer-register' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'organizer-edit' }">Edit</RouterLink>
    </div>

    <RouterView :organizer="organizer"></RouterView>
  </div>
</template>
