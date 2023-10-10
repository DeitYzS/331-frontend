<script setup lang="ts">
import { OrganizerItem } from '@/type'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
const props = defineProps({
  organizer: {
    type: Object as PropType<OrganizerItem>,
    require: true
  }
})
const router = useRouter()
const store = useMessageStore()
function register() {
  store.updateMessage('You are successfully registered for ' + props.organizer?.name)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({
    name: 'organizer-detail',
    params: {
      id: props.organizer?.id
    }
  })
}
</script>

<template>
  <p>Registration from here</p>
  <button @click="register">Register Me</button>
</template>
