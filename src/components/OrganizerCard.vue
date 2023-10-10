<script setup lang="ts">
import type { OrganizerItem } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  organizer: {
    type: Object as PropType<OrganizerItem>,
    require: false
  }
})
</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'organizer-detail', params: { id: organizer?.id } }">
    <div class="event-class">
      <div class="event-card">
        <h4>Id : {{ organizer?.id }}</h4><br>
        <h4>Organizer : {{ organizer?.name }}</h4><br>
<!--        <h4>Address : {{ organizer?.address }}</h4>-->
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
