<script setup lang="ts">
import type { OrganizerItem } from '@/type'
import type { PropType } from 'vue'

const props = defineProps({
  organizer: {
    type: Object as PropType<OrganizerItem>,
    require: true
  }
})
</script>

<template>
  <p>Edit the event here</p>
</template>
